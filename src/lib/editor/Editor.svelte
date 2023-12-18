<script>
  import User from "$lib/User.svelte";
  import { databases, ID } from "$lib/appwrite";
  import { Query } from "appwrite";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  export let data;
  let curIndex = false;

  onMount(async () => {
    // getPosts();
    document.querySelectorAll("[data-edit]").forEach((el) => {
      el.addEventListener("click", (ev) => {
        // alert(el.closest("[data-edit]").id);
        let id = el.closest("[data-edit]").id;
        curIndex = posts.findIndex((x) => x.$id == id);
        console.log(curIndex);
      });
    });
  });
  export let user;
  export let posts;
  let loading = false;
  let post = {};

  /*
    async function getPosts() {
      const promise = databases.listDocuments("blog", "posts", [
        Query.select(["title", "body"]),
      ]);
  
      promise.then(
        function (response) {
          console.log(response); // Success
  
          posts = response.documents.reverse();
        },
        function (error) {
          console.log(error); // Failure
        }
      );
    }
    */

  async function addPost() {
    loading = true;
    const promise = databases.createDocument("blog", "posts", ID.unique(), {
      title: post.title,
      body: post.body,
    });

    promise.then(
      function (response) {
        console.log(response); // Success
        post = {};
        getPosts();
        loading = false;
      },
      function (error) {
        console.log(error); // Failure
        loading = false;
      }
    );
  }

  function updatePost() {
    loading = true;
    const promise = databases.updateDocument(
      "blog",
      "posts",
      posts[curIndex].$id,
      {
        title: posts[curIndex].title,
        body: posts[curIndex].body,
      }
    );

    promise.then(
      function (response) {
        console.log(response); // Success
        loading = false;
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
    [data-edit] {
      border: 1px solid transparent;
    }

    [data-edit]:hover {
      border: 1px dashed #999;
      cursor: pointer;
    }
  </style>
</svelte:head>

{#if curIndex !== false}
  <div
    class="editor"
    spellcheck="false"
    transition:fly={{ duration: 500, x: 400 }}
  >
    <div class="editor-content">
      <button
        type="button"
        class="btn-close mb-3 float-end"
        aria-label="Close"
        on:click={() => (curIndex = false)}
      ></button>

      <input
        type="text"
        class="form-control"
        bind:value={posts[curIndex].title}
      />

      <textarea class="form-control mt-3" bind:value={posts[curIndex].body}
      ></textarea>

      <button class="btn btn-dark mt-3" on:click={updatePost}>
        {#if loading}
          <div
            id="spinner"
            class="spinner-border spinner-border-sm"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        {:else}
          Save
        {/if}
      </button>
    </div>
  </div>
{/if}

<style>
  .editor textarea {
    resize: none;
    height: 150px;
  }

  .editor {
    position: fixed;
    top: 0;
    right: 0;
    width: 475px;
    height: 100%;
    border-left: 1px solid #ccc;
    background-color: #f8f8f8;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  }

  .editor-content {
    padding: 15px;
  }
</style>
