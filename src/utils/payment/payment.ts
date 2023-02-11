import * as paypay from "./_paypay";

export const pp = window.pp;

export function pay(via: "paypay", price) {
  if (via === "paypay") {
    paypay.pay(price);
  }
}
