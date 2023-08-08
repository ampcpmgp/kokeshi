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
