<script>
  import { push } from "svelte-spa-router";
  import Box from "../lib/Box.svelte";
  import Spacer from "../lib/Spacer.svelte";
  import { supabase } from "../supabaseClient";

  let email = "";
  let password = "";
  let emailToRegister = "";
  let passwordToRegister = "";
  let success = false;

  async function register() {
    success = false;

    const { data, error } = await supabase.auth.signUp({
      email: emailToRegister,
      password: passwordToRegister,
    });

    if (error) {
      alert(error);
      return;
    }

    success = true;
  }

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error);

    push("/");
  }
</script>

<main>
  <Box>
    <label for="">Email</label>
    <input type="email" bind:value={email} />

    <Spacer width={12} />

    <label for="">Password</label>
    <input type="password" bind:value={password} />

    <Spacer height={8} />

    <button on:click={login}>ログインする</button>
  </Box>

  <Box>
    <label for="">Email</label>
    <input type="email" bind:value={emailToRegister} />

    <Spacer width={12} />

    <label for="">Password</label>
    <input type="password" bind:value={passwordToRegister} />

    <Spacer height={8} />

    <button on:click={register}>登録する</button>

    <Spacer height={4} />

    {#if success}
      Success!
    {/if}
  </Box>
</main>

<style>
  main {
    display: grid;
    place-content: center;
  }
</style>
