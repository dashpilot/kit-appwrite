<script>
  import { account } from "$lib/appwrite";

  let loading = false;
  let error = false;
  let email;
  let password;

  async function login() {
    loading = true;

    const promise = account.createEmailSession(email, password);

    promise.then(
      async function (response) {
        console.log(response); // Success

        /*
        const user = await account.createJWT();
        console.log(user);

        // Assuming user.jwt contains the JWT
        const res = await fetch("/account/login", {
          method: "POST",
          headers: {
            "x-appwrite-user-jwt": user.jwt,
          },
          body: JSON.stringify({
            email: response.providerUid,
            userId: response.$id,
          }),
        });
        */

        window.location = "/";
        loading = false;
      },
      function (myerror) {
        console.log(myerror); // Failure
        error = "Error: invalid email or password";
        loading = false;
      }
    );
  }
</script>

<div class="backdrop">
  <div class="card shadow-sm mt-5" style="width: 360px; margin: 0 auto;">
    <div class="card-body">
      <h2 class="text-center">Log in</h2>

      {#if error}
        <div class="alert alert-warning mt-4 text-center" role="alert">
          {error}
        </div>
      {/if}

      <div class="form-group">
        <label class="mb-1" for="username">Email</label>
        <input
          type="email"
          class="form-control mb-2"
          id="email"
          name="email"
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

      <div class="text-center pt-3 pb-1">
        No account yet? <a href="/account/register">Create an account</a>
      </div>
    </div>
  </div>
</div>

<style>
  .backdrop {
    width: 100%;
    height: 100%;
    background-color: #f3f4f6;
    padding-top: 20px;
  }
</style>
