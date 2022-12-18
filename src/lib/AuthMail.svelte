<script>
  import { supabase } from "../supabaseClient";
  import Box from "./Box.svelte";

  let email = "";
  let password = "";
  let success = false;

  async function register() {
    success = false;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
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
  }
</script>

<Box title="Login" wip>
  <label for="">Email</label>
  <input type="email" bind:value={email} />
  <label for="">Password</label>
  <input type="password" bind:value={password} />

  <br />
  <button on:click={login}>ログイン</button>
</Box>

<Box title="Register" wip>
  <label for="">Email</label>
  <input type="email" bind:value={email} />
  <label for="">Password</label>
  <input type="password" bind:value={password} />

  <br />
  <button on:click={register}>登録する</button>
  <br />
  {#if success}
    Success!
  {/if}
</Box>
