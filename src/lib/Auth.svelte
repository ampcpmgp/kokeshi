<script lang="ts">
  import { supabase } from "../supabaseClient";

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  }
</script>

<div><button on:click={signIn}>Google Login</button></div>
