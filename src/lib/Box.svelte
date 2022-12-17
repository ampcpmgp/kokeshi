<script>
  export let title = "";
</script>

<div class="box">
  <p>[工事中] {title}</p>
  <slot />
</div>

<style>
  .box {
    border-radius: 8px;
    padding: 8px;
    border: solid 1px yellowgreen;
  }
</style>
