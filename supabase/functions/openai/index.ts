// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.2.0";
import { corsHeaders } from "../_shared/utils/cors.ts";
import { checkCredit } from "./check-credit.ts";
import { checkBody } from "./check-body.ts";
import { getPrice } from "../_shared/utils/price.ts";
import { AnalyticsKind } from "../_shared/const/analytics-kind.ts";

serve(async (req) => {
  const { method } = req;

  // This is needed if you're planning to invoke your function from a browser.
  if (method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const reqData = await req.json();

    checkBody(reqData);

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const {
      data: { user },
      error,
    } = await supabaseClient.auth.getUser();

    if (error) throw error;
    if (!user) throw new Error("No User");

    // get balance
    const { data: balance, error: balanceError } = await supabaseClient
      .from("balances")
      .select("*")
      .eq("id", user.id)
      .single();

    if (balanceError) throw balanceError;

    try {
      checkCredit(balance.credit);
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    const analyticsKind = AnalyticsKind[reqData.kind];

    // https://beta.openai.com/docs/api-reference/completions
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      },
      body: JSON.stringify({
        model: analyticsKind.MODEL,
        messages: [{ role: "user", content: reqData.prompt }],
      }),
    });

    const data = await response.json();
    const price = getPrice(
      data.usage.total_tokens,
      analyticsKind.PRICE_PER_WORD
    );

    const { data: latestBalance } = await supabaseClient
      .from("balances")
      .select("*")
      .eq("id", user.id)
      .single();

    await supabaseClient
      .from("balances")
      .update({
        credit: latestBalance ? latestBalance.credit - price : 0,
      })
      .eq("id", user.id)
      .single();

    return new Response(JSON.stringify({ ...data, price }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
