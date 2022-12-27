<script lang="ts">
  let price: 100 | 500 | 2000 = 100;
</script>

<main>
  <div class="price-box">
    <div class="price" class:active={price === 100}>100円</div>
    <div class="price" class:active={price === 500}>500円</div>
    <div class="price" class:active={price === 2000}>2000円</div>
  </div>

  <button disabled>PayPay ( 工事中👷)</button>
</main>

<style>
  .price.active {
    background-color: #555;
    border-color: #555;
    border-width: 2px;
  }
  .price {
    opacity: 0.3;
    cursor: not-allowed;
    border: solid 1px #999;
    padding: 4px 8px;
    display: grid;
    place-items: center;
    border-radius: 12px;
  }
  .price-box {
    display: flex;
    justify-content: space-around;
    gap: 4px;
  }
  main {
    display: grid;
    margin: auto;
    padding: 10px 0;
  }
</style>
