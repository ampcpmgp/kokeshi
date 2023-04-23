<script lang="ts">
  import { link } from "svelte-spa-router";
  import { Emoji, Emotion, Free, Vars } from "../const/analytics-kind";
  import { supabase } from "../supabaseClient";
  import Payment from "./Payment.svelte";
</script>

<main>
  <div>
    <a href="/emotion" use:link>
      <button>{Emotion.TITLE} {Emotion.EMOJI}</button>
    </a>
  </div>

  <div>
    <a href="/emoji" use:link>
      <button>{Emoji.TITLE} {Emoji.EMOJI}</button>
    </a>
  </div>

  <div>
    <a href="/vars" use:link>
      <button>{Vars.TITLE} {Vars.EMOJI}</button>
    </a>
  </div>

  <div>
    <a href="/free" use:link>
      <button>{Free.TITLE} {Free.EMOJI}</button>
    </a>
  </div>

  <hr />

  <Payment />

  <hr />

  <div>
    <button on:click={() => supabase.auth.signOut()}>Sign Out</button>
  </div>
</main>

<style>
  main {
    display: grid;
  }

  main hr {
    width: 100%;
  }
</style>
