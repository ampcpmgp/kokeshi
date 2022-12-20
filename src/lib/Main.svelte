<script lang="ts">
  import { link } from "svelte-spa-router";
  import { supabase } from "../supabaseClient";
</script>

<main>
  <a href="/emotion" use:link>
    <button>感情判定 😄</button>
  </a>

  <a href="/free" use:link>
    <button>自由入力 💬</button>
  </a>

  <hr />
  <button on:click={() => supabase.auth.signOut()}>Sign Out</button>
</main>

<style>
  main {
    display: grid;
  }

  main hr {
    width: 100%;
  }
</style>
