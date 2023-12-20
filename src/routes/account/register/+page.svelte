<script>
  import { account, ID } from "$lib/appwrite";

  let loading = false;
  let error = false;
  let username;
  let email;
  let password;

  async function register() {
    loading = true;

    const promise = account.create(ID.unique(), email, password, username);

    promise.then(
      function (response) {
        console.log(response); // Success
        window.location = "/account/login";
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
      <h2 class="text-center">Register</h2>

      {#if error}
        <div class="alert alert-warning mt-4 text-center" role="alert">
          {error}
        </div>
      {/if}

      <div class="form-group">
        <label class="mb-1" for="username">Username</label>
        <input
          type="username"
          class="form-control mb-2"
          id="username"
          name="username"
          bind:value={username}
        />
      </div>

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

      <button on:click={register} type="submit" class="btn btn-dark w-100 mt-2">
        {#if loading}
          <div
            id="spinner"
            class="spinner-border spinner-border-sm htmx-indicator"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        {:else}
          Register
        {/if}
      </button>
      <div class="text-center pt-3 pb-1">
        Already have an account? <a href="/account/login">Log in</a>
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
