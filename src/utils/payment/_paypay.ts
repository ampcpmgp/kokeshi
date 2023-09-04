import { supabase } from "../../supabaseClient";

export async function pay(price) {
  const { data, error } = await supabase.functions.invoke("pay", {
    body: { price },
  });

  if (error || !data || !data.url) {
    alert("エラーが発生しました。時間を置いて、再度お試しください。");

    return;
  }

  window.open(data.url, "_blank");
}

export async function checkPay(id) {
  const { data, error } = await supabase.functions.invoke("pay-check", {
    body: { id },
  });

  if (error || !data) {
    alert("エラーが発生しました。時間を置いて、再度お試しください。");

    return;
  }

  return data.status;
}
