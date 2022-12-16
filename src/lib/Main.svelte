<script lang="ts">
  import { link } from "svelte-spa-router";
  import { supabase } from "../supabaseClient";
</script>

<main>
  <a href="/emotion" use:link>
    <button>感情</button>
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
