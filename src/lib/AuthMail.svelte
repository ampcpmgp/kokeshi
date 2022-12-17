<script>
  import Box from "./Box.svelte";

  let email = "";
  let password = "";

  function register() {
    console.log(
      "\n---------- filtered log 🚀 ------------\n\n",
      "filtered log 🚀 email,password",
      email,
      password
    );
  }
</script>

<Box title="メール認証">
  <label for="">Email</label>
  <input type="email" bind:value={email} />
  <label for="">Password</label>
  <input type="password" bind:value={password} />

  <br />
  <button on:click={register}>登録する</button>
</Box>
