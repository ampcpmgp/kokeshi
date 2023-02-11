import { supabase } from "../../supabaseClient";

export const pp = window.pp;

let initP = null;

export function init() {
  return new Promise((resolve, reject) => {
    pp.init({
      clientId: "",
      // env: "sandbox",
      success(res) {
        resolve(res);
      },
      fail(res) {
        console.log("\n- 🚀 -\n\n", "🚀 res", res);
        reject(res);
      },
    });
  });
}

export async function pay(price) {
  const { data, error } = await supabase.functions.invoke("pay", {
    body: { name: "hello" },
  });

  // if (initP === null) {
  //   initP = init();
  // }
  // const client = await initP;
  // console.log("🚀🐡 ~ file: _paypay.ts:26 ~ pay ~ client", client);
  // return;
  // pp.getAuthStatus({
  //   success: (data) => {
  //     console.log(data);
  //   },
  //   fail: (response) => {
  //     let errorCode = response.errorCode; // e.g. NOT_AUTHORIZED, TOKEN_EXPIRED,  PERMISSION_REQUIRED...
  //     let code = response.code;
  //     // pass 'code' object to paypay backend to get login url
  //     console.info("errorCode", errorCode);
  //     console.info("code", code);
  //     window.alert(`errorCode: ${errorCode}`);
  //   },
  // });
}
