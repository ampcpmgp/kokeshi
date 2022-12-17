<script>
  export let title = "";
  export let wip = false;
</script>

<div class="box" class:wip>
  {#if wip}
    👷　工事中 👷
  {/if}
  <p>{title}</p>
  <slot />
</div>

<style>
  .box {
    border-radius: 8px;
    padding: 8px;
    margin: 12px;
    border: solid 1px #999;
  }
  .box.wip {
    border-color: yellow;
  }
</style>
