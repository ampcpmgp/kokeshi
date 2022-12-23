<script lang="ts">
  import { link } from "svelte-spa-router";
  import { supabase } from "../supabaseClient";
  import Payment from "./Payment.svelte";
</script>

<main>
  <div>
    <a href="/emotion" use:link>
      <button>感情判定 😄 (0.2~0.8円)</button>
    </a>
  </div>

  <div>
    <a href="/free" use:link>
      <button>自由入力 💬 (0.2~22円)</button>
    </a>
  </div>

  <hr />

  <Payment />

  <hr />

  <div>
    <button on:click={() => supabase.auth.signOut()}>Sign Out</button>
  </div>
</main>

<style>
  main {
    display: grid;
  }

  main hr {
    width: 100%;
  }
</style>
