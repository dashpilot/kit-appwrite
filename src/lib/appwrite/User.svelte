<script>
  import { onMount } from "svelte";
  import { account, logout } from "$lib/appwrite/client.js";

  onMount(async () => {
    checkLoggedIn();
  });

  let logged_in = false;
  export let user = false;

  async function checkLoggedIn() {
    try {
      console.log("checking user");

      user = await account.getSession("current");
      console.log(user);

      logged_in = true;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  function doLogout() {
    logout();
    user = false;
  }
</script>

<div>
  {#if user}
    <button class="btn btn-outline-light" on:click={doLogout}>Log Out</button>
  {:else}
    <a href="/account/login" class="btn btn-outline-light">Log In</a>
  {/if}
</div>
