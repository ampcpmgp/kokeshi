<script>
  import { link } from "svelte-spa-router";

  const law = "特定商取引法に基づく表記";
  const howToUse = "ご利用の流れ";
  const about = "事業者情報";
</script>

<footer>
  <a href="/law" use:link title={law}>{law}</a>
  <a href="/how-to-use" use:link title={howToUse}>{howToUse}</a>
  <a
    href="https://am-public.vercel.app/"
    target="_blank"
    rel="noreferrer"
    title={about}
    >{about}
    <i class="fa-solid fa-arrow-up-right-from-square" />
  </a>
</footer>

<style>
  footer {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: inline-grid;
    grid-auto-flow: column;
    place-content: center;
    gap: 8px;
    padding: 8px 16px;
    border-top: solid 1px #555;
    font-size: 0.8rem;
    background-color: #000;
  }

  a {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    footer {
      grid-auto-flow: initial;
    }
  }
</style>
