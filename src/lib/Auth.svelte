<script lang="ts">
  import { link, push } from "svelte-spa-router";
  import { supabase } from "../supabaseClient";
  import { onMount } from "svelte";
  import CircleButton from "./CircleButton.svelte";
  import Footer from "./Footer.svelte";

  // キャンペーン中
  let inCampaign = false;

  onMount(() => {
    campaigns();
  });

  async function campaigns() {
    const { data: campaigns, error } = await supabase
      .from("campaigns")
      .select("*");

    const campaign = campaigns?.find((c) => c.remaining > 0);

    if (!campaign) {
      inCampaign = false;
      return;
    }

    inCampaign = !campaign;
  }

  async function signInGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  }

  async function goToEmailAuth() {
    push("/email-auth");
  }
</script>

<div>Login below</div>

<div class="pathway">
  <CircleButton on:click={signInGoogle}>
    <i class="fa-brands fa-google" />
  </CircleButton>

  <CircleButton on:click={goToEmailAuth}>
    <i class="fa-solid fa-envelope" />
  </CircleButton>
</div>

<Footer />

<style>
  .pathway {
    min-width: 120px;
    margin: 8px;
    padding: 0 8px;
    display: inline-flex;
    justify-content: center;
    border-top: solid 1px #ccc;
  }

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
