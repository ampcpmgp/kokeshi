<script lang="ts">
  import { link } from "svelte-spa-router";
  import { supabase } from "../supabaseClient";
</script>

<main>
  <button>
    <a href="/emotion" use:link>感情</a>
  </button>

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
