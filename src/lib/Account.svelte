<script lang="ts">
  import { supabase } from "../supabaseClient";
</script>

<button on:click={() => supabase.auth.signOut()}> Sign Out </button>
