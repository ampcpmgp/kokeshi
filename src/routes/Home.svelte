<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "../supabaseClient";
  import type { AuthSession } from "@supabase/supabase-js";
  import Main from "../lib/Main.svelte";
  import Auth from "../lib/Auth.svelte";

  let session: AuthSession;

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session = data.session;
    });

    supabase.auth.onAuthStateChange((_event, _session) => {
      session = _session;
    });
  });
</script>

<main>
  {#if !session}
    <Auth />
  {:else}
    <Main />
  {/if}
</main>
