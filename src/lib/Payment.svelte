<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { supabase } from "../supabaseClient";
  import { pay } from "../utils/payment/payment";
  import Spacer from "./Spacer.svelte";
  import { resolved } from "../states/resolved";

  let price: 100 | 1000 | 10000 = 100;
  let credit = 0.0;
  let payResolved = resolved(Promise.resolve());
  let inProgress = false;

  const query = supabase.from("balances");

  const subscriber = supabase
    .channel("*")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "balances" },
      (payload) => {
        credit = (payload.new as any).credit;
      }
    );

  async function getCredit() {
    const { data } = await query.select("*");

    return data[0].credit;
  }

  async function handlePayClick() {
    inProgress = true;
    payResolved = resolved(pay("paypay", price));
  }

  onMount(async () => {
    credit = await getCredit();
    subscriber.subscribe();
  });

  onDestroy(() => {
    subscriber.unsubscribe();
  });
</script>

<svelte:window
  on:blur={() => console.log("blur")}
  on:focus={() => console.log("focus")}
/>

<main>
  <div>[残高]</div>
  <span>{credit}円</span>

  <Spacer height={12} />

  <div>[入金]</div>
  <div class="price-box">
    <button
      class="price"
      on:click={() => (price = 100)}
      class:active={price === 100}>100円</button
    >
    <button
      class="price"
      on:click={() => (price = 1000)}
      class:active={price === 1000}>1000円</button
    >
  </div>

  <button
    style="display: flex; place-items: center; gap: 8px;"
    on:click={handlePayClick}
    disabled={!$payResolved}
  >
    PayPay で購入
    <img
      width="30px"
      height="auto"
      src="/images/paypay_3_rgb.png"
      alt="PayPay"
    />
  </button>
</main>

<style>
  .price-box {
    display: flex;
    justify-content: space-around;
    margin: auto;
    gap: 4px;
  }
  .price.active {
    border: solid 2px white;
    opacity: 1;
  }
  .price {
    margin: 4px 0;
    padding: 4px 8px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    opacity: 0.3;
  }
  main {
    display: grid;
    margin: auto;
    padding: 10px 0;
  }
</style>
