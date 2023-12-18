<script>
  import User from "$lib/User.svelte";
  import Editor from "$lib/editor/Editor.svelte";

  export let data;
  let posts = data.posts;
  let user = false;
</script>

<nav class="bg-black py-2 px-3 d-flex justify-content-between">
  <h4 class="text-white m-0 pt-1">Sveltekit</h4>
  <User bind:user />
</nav>

<div class="container mt-5">
  {#if posts}
    <div class="mt-4 mb-4">
      {#each posts as item}
        <div id={item.$id} data-edit data-fields="title=text&body=html">
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>

{#if user}
  <Editor bind:user bind:posts />
{/if}

<style>
  [data-edit] {
    border: 1px solid transparent;
  }
</style>
