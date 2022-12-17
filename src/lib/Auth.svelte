<script lang="ts">
  import AuthMail from "./AuthMail.svelte";
  import { supabase } from "../supabaseClient";
  import Box from "./Box.svelte";

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

<div class="balloon">
  <p>500円分のクレジットを手にする</p>
</div>

<AuthMail />

<style>
  .balloon {
    position: relative;
    top: 1rem;
    border-radius: 8px;
    border: solid 1px #999;
    margin-bottom: 28px;
  }

  .balloon::before {
    content: "";
    position: absolute;
    top: -28px;
    left: 50%;
    transform: translateX(-50%);
    border: 14px solid transparent;
    border-bottom: 14px solid #999;
  }

  .balloon::after {
    content: "";
    position: absolute;
    top: -24px;
    left: 50%;
    transform: translateX(-50%);
    border: 12px solid transparent;
    border-bottom: 12px solid black;
  }

  p {
    margin: 0;
    padding: 12px;
  }
</style>
