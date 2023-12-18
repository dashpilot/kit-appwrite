<script>
  import { account } from "$lib/appwrite";

  let loading = false;
  let email;
  let password;

  function login() {
    loading = true;

    const promise = account.createEmailSession(email, password);

    promise.then(
      function (response) {
        console.log(response); // Success
        loading = false;
        window.location = "/";
      },
      function (error) {
        console.log(error); // Failure
        loading = false;
      }
    );
  }
</script>

<svelte:head>
  <style>
    body {
      background-color: #f3f4f6;
    }
  </style>
</svelte:head>

<div class="card shadow-sm mt-5" style="width: 360px; margin: 0 auto;">
  <div class="card-body">
    <h2 class="text-center">Log in</h2>

    <div id="result"></div>

    <div class="form-group">
      <label class="mb-1" for="username">Username</label>
      <input
        type="username"
        class="form-control mb-2"
        id="username"
        name="username"
        bind:value={email}
      />
    </div>
    <div class="form-group">
      <label class="mb-1" for="password">Password</label>
      <input
        type="password"
        class="form-control mb-2"
        id="password"
        name="password"
        bind:value={password}
      />
    </div>

    <button on:click={login} type="submit" class="btn btn-dark w-100 mt-2">
      {#if loading}
        <div
          id="spinner"
          class="spinner-border spinner-border-sm htmx-indicator"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      {:else}
        Submit
      {/if}
    </button>
  </div>
</div>
