// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from "../_shared/utils/cors.ts"
import { checkCredit } from "./check-credit.ts"
import { checkBody } from "./check-body.ts"

serve(async (req) => {
  const { method } = req
	
  // This is needed if you're planning to invoke your function from a browser.
  if (method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

	const reqData = await req.json()

	try {
		checkBody(reqData);
	} catch (error) {
		return new Response(
			JSON.stringify({ error: error.message }),
			{ headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
		)
	}

	// Create a Supabase client with the Auth context of the logged in user.
	const supabaseClient = createClient(
		// Supabase API URL - env var exported by default.
		Deno.env.get('SUPABASE_URL') ?? '',
		// Supabase API ANON KEY - env var exported by default.
		Deno.env.get('SUPABASE_ANON_KEY') ?? '',
		// Create client with Auth context of the user that called the function.
		// This way your row-level-security (RLS) policies are applied.
		{ global: { headers: { Authorization: req.headers.get('Authorization')! } } }
	)

    // Now we can get the session or user object
    const {
      data: { user },
			error
    } = await supabaseClient.auth.getUser()

		if (error) throw error
		if (!user) throw new Error("No User")

		// get balance
		const { data: balance, error: balanceError } = await supabaseClient.from('balances').select('*').eq('id', user.id).single()

		if (balanceError) throw balanceError

		try {
			checkCredit(balance.credit);
		} catch (error) {
			return new Response(
				JSON.stringify({ error: error.message }),
				{ headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
			)
		}

		// TODO getToken
		// const creditMaxToken = getToken()
		
	// https://beta.openai.com/docs/api-reference/completions
  const response = await fetch("https://api.openai.com/v1/completions",
	 {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`
		},
		body: JSON.stringify({
			model: "text-davinci-003",	
			prompt: reqData.prompt,
			// default 16
			// TODO 計算する
			max_tokens: 3000,
		})
	});

	const data = await response.json()

  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  )
})

/**
curl --request POST 'http://localhost:54321/functions/v1/openai'   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs'   --header 'Content-Type: application/json'   --data '{ "message":"サンプルメッセージ送信。" }'
*/