<script>
  import { link } from "svelte-spa-router";
  import Spacer from "../lib/Spacer.svelte";
</script>

<main>
  <h2>Kokeshi ご利用の流れ</h2>

  <p>1. アカウント登録を行う</p>
  <img src="/how-to-use/login.png" alt="Click to login button" />
  <span class="remark">
    グーグル認証、メールアドレス認証のいずれかを選択できます。</span
  >
  <Spacer height={24} />

  <p>2. 入金する</p>
  <img src="/how-to-use/payment.png" alt="Payment" />
  <span class="remark"
    >※現在工事中
    <br />
    ①で入金後、②の残高に反映されます。
  </span>
  <Spacer height={24} />

  <p>3. 解析ページに移動する</p>
  <img src="/how-to-use/analytics-page.png" alt="Move to analysis page" />
  <span class="remark">
    感情判定：入力したメッセージの感情を絵文字で分類します。<br />
    絵文字変換：入力したメッセージを絵文字だけで表現します。<br />
    変数名：入力したメッセージからより良い変数名を提案します。<br />
    自由入力：入力したメッセージの意図を推測し、返信します。
  </span>
  <Spacer height={24} />

  <p>4. メッセージを入力して実行する</p>
  <img src="/how-to-use/execute.png" alt="Input message and execute" />
  <span class="remark">
    ①に入力し、②の実行を押すと実行されます。<br />
    その後③に結果が表示され、④に利用料金が表示されます。
  </span>
  <Spacer height={24} />

  <span class="remark">
    詳しい利用料金は<a href="/law" use:link>特定商取引法に基づく表記</a
    >をご覧ください。
  </span>
  <Spacer height={24} />
</main>

<style>
  .remark {
    font-size: 0.8rem;
    color: #ccc;
  }

  main {
    display: grid;
    place-items: center;
  }

  p {
    font-weight: bold;
  }
  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 1rem;
    border: solid 1px #555;
  }
</style>
