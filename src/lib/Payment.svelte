<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { supabase } from "../supabaseClient";

  let price: 100 | 500 | 2000 = 100;
  let credit = 0.0;

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

  onMount(async () => {
    credit = await getCredit();
    subscriber.subscribe();
  });

  onDestroy(() => {
    subscriber.unsubscribe();
  });
</script>

<main>
  <p>[残高] {credit}円</p>

  <p>[入金]</p>

  <div class="price-box">
    <div class="price" class:active={price === 100}>100円</div>
  </div>

  <button disabled>PayPay ( 工事中👷)</button>
</main>

<style>
  .price.active {
    background-color: #555;
    border-color: #555;
    border-width: 2px;
  }
  .price {
    opacity: 0.3;
    cursor: not-allowed;
    border: solid 1px #999;
    padding: 4px 8px;
    display: grid;
    place-items: center;
    border-radius: 12px;
  }
  .price-box {
    display: flex;
    justify-content: space-around;
    gap: 4px;
  }
  main {
    display: grid;
    margin: auto;
    padding: 10px 0;
  }
</style>
