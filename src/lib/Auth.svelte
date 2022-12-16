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

<header>
  <h1>
    Kokeshi
    <p class="tag">AI Powered Communication Tool</p>
  </h1>
</header>

<div><button on:click={signIn}>Google Login</button></div>

<div class="balloon">
  <p>500円分のクレジットを手にする</p>
</div>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    width: 100%;
    place-items: center;
  }

  h1 {
    position: relative;
  }

  .tag {
    font-size: 12px;
    color: #ccc;
    border: solid 1px #999;
    padding: 4px;
    border-radius: 4px;
    position: absolute;
    top: 100%;
    right: 0;
  }

  .balloon {
    position: relative;
    top: 1rem;
    border-radius: 8px;
    border: solid 1px #999;
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
