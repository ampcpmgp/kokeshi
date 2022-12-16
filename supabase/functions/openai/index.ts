// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
	const reqData = await req.json()

  const response = await fetch("https://api.openai.com/v1/completions",
	 {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`
		},
		body: JSON.stringify({
			model: "text-davinci-003",	
			prompt: reqData.message,
		})
	});

	const data = await response.json()

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})

/**
curl --request POST 'http://localhost:54321/functions/v1/openai'   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs'   --header 'Content-Type: application/json'   --data '{ "message":"サンプルメッセージ送信。" }'
*/