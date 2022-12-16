<script>
  import { supabase, tokenP } from "./../supabaseClient";

  let value = "";
  let result = "";

  async function onExecute() {
    const token = tokenP;

    const { data, error } = await supabase.functions.invoke("openai", {
      body: { message: value },
    });
  }
</script>

<main>
  <h2>Input</h2>
  <textarea bind:value placeholder="" />

  <button on:click={onExecute}>実行</button>

  <h2>Result</h2>
  <textarea readonly value={result} placeholder="" />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  textarea {
    width: 600px;
    max-width: 80%;
    height: 140px;
  }
</style>
