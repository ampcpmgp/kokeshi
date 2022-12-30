<script>
  import { link } from "svelte-spa-router";
</script>

<footer>
  <a href="/law" use:link>特定商取引法に基づく表記</a>
  <a href="/how-to-use" use:link>ご利用の流れ</a>
  <a href="https://am-public.vercel.app/" target="_blank" rel="noreferrer"
    >事業者情報
    <i class="fa-solid fa-arrow-up-right-from-square" />
  </a>
</footer>

<style>
  footer {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: inline-flex;
    place-content: center;
    gap: 8px;
    padding: 8px 16px;
    border-top: solid 1px #555;
    font-size: 0.8rem;
    background-color: #000;
  }
</style>
