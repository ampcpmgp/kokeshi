<script lang="ts">
  export let size: "small" | "medium" | "large" = "medium";
</script>

<button
  class:small={size === "small"}
  class:medium={size === "medium"}
  class:large={size === "large"}
  on:click
>
  <slot />
</button>

<style>
  button {
    border-radius: 50%;
    display: grid;
    place-content: center;
    padding: 0;
  }

  .small {
    font-size: 0.8rem;
    width: 32px;
    height: 32px;
  }

  .medium {
    font-size: 1rem;
    width: 48px;
    height: 48px;
  }

  .large {
    font-size: 1.2rem;
    width: 64px;
    height: 64px;
  }
</style>
