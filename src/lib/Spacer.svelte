<script>
  export let width = 0;
  export let height = 0;

  $: _width = `${width}px`;
  $: _height = `${height}px`;
  $: display = height > 0 ? "block" : "inline-block";
</script>

<span style:width={_width} style:height={_height} style:display />
