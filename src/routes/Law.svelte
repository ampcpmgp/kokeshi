<script>
  import { Emotion } from "../const/analytics-kind";
  import { getFunctionMinPrice } from "../utils/price";

</script>
<h2>特定商取引法に基づく表記</h2>

<div class="wrapper">
  <table>
    <tbody>
      <tr>
        <td>販売者</td>
        <td>早竹亮</td>
      </tr>
      <tr>
        <td>運営責任者</td>
        <td>早竹亮</td>
      </tr>
      <tr>
        <td>所在地</td>
        <td>東京都世田谷区世田谷1-48-17 ロイヤルレジデンス303</td>
      </tr>
      <tr>
        <td>電話番号</td>
        <td>080-4083-0020</td>
      </tr>
      <tr>
        <td>受付時間</td>
        <td>14:30 ~ 17:30</td>
      </tr>
      <tr>
        <td>メールアドレス</td>
        <td>ampcpmgp@gmail.com</td>
      </tr>
      <tr>
        <td>ホームページURL</td>
        <td>
          <a
            href="https://am-public.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            https://am-public.vercel.app/
          </a>
        </td>
      </tr>
      <tr>
        <td>お支払方法</td>
        <td>PayPay (予定) にて100円より</td>
      </tr>
      <tr>
        <td>返金</td>
        <td>決済手数料がかかっているため、原則返金は出来ません</td>
      </tr>
      <tr>
        <td>基本価格</td>
        <td>
          AI解析時における送信文字・返却文字の合計が10文字当たり0.12円<br />
          (1回当たりの最大解析文字数は2700文字で、その場合の金額は33円となります)
          <br />
          <br />
          また、絵文字や一部の漢字などはマルチバイト文字として扱われます。詳しくは
          <a
            href="https://charactercounttool.com/"
            target="_blank"
            rel="noreferrer"
          >
            こちらのサイト
          </a> で文字を入力し、characters にある数値をご確認ください。
        </td>
      </tr>
      <tr>
        <td>機能価格</td>
        <td>
          上記基本価格に加え、機能ごとに以下追加料金がかかります。
          <br />
          <br />
          ・{Emotion.TITLE}: {getFunctionMinPrice(Emotion)}円
          <br />
          <br />
          各機能ページの下部にある「最低価格」を参考にしてください。
        </td>
      </tr>
      <tr>
        <td>キャンセル</td>
        <td>AI解析後のキャンセルはお受けできません</td>
      </tr>
      <tr>
        <td>商品代金以外の必要料金</td>
        <td>なし</td>
      </tr>
      <tr>
        <td>結果取得時期</td>
        <td>原則即時</td>
      </tr>
    </tbody>
  </table>
</div>

<style>
  .wrapper {
    display: grid;
    place-content: center;
  }

  td {
    border: 1px solid #555;
    padding: 0.6rem;
  }

  td:first-child {
    background-color: #555;
  }
</style>
