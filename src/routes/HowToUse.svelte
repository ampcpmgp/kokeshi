<script>
  import Spacer from "../lib/Spacer.svelte";
</script>

<main>
  <h2>ご利用の流れ</h2>

  <p>1. アカウント登録を行う</p>
  <img src="/how-to-use/login.png" alt="Click to login button" />
  <span class="remark">
    ※グーグル認証、メールアドレス認証のいずれかを選択できます。</span
  >
  <Spacer height={24} />

  <p>2. 入金する</p>
  <img src="/how-to-use/payment.png" alt="Payment" />
  <span class="remark">※現在工事中</span>
  <Spacer height={24} />

  <p>3. 解析ページに移動する</p>
  <img src="/how-to-use/analytics-page.png" alt="Move to analysis page" />
  <Spacer height={24} />

  <p>4. メッセージを入力して実行する</p>
  <img src="/how-to-use/execute.png" alt="Input message and execute" />
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
