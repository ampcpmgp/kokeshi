<script>
  let value = "";
  let result = "";
</script>

<main>
  <h2>Input</h2>
  <textarea bind:value placeholder="" />

  <button>実行</button>

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
