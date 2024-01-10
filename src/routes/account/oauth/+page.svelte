<script>
  import { account } from "$lib/appwrite/client.js";

  function signIn() {
    account.createOAuth2Session(
      "google",
      "https://kit-appwrite.vercel.app",
      "https://kit-appwrite.vercel.app"
    );
  }
</script>

<button on:click={signIn}>Google</button>
