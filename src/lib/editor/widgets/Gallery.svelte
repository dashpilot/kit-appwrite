<script>
  import { storage, databases } from "$lib/appwrite/client.js";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  // export let data;
  export let curItem;
  export let key;

  let saving = false;

  let cfg = {};
  cfg.img_width = 800;
  cfg.img_url = "/";

  onMount(async () => {
    document
      .getElementById("fileInput")
      .addEventListener("change", function (e) {
        var img = new Image();

        saving = true;

        img.onload = async function () {
          var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            oc = document.createElement("canvas"),
            octx = oc.getContext("2d");

          canvas.width = cfg.img_width; // destination canvas size
          canvas.height = (canvas.width * img.height) / img.width;

          var cur = {
            width: Math.floor(img.width * 0.5),
            height: Math.floor(img.height * 0.5),
          };
          oc.width = cur.width;
          oc.height = cur.height;
          octx.drawImage(img, 0, 0, cur.width, cur.height);
          while (cur.width * 0.5 > cfg.img_width) {
            cur = {
              width: Math.floor(cur.width * 0.5),
              height: Math.floor(cur.height * 0.5),
            };
            octx.drawImage(
              oc,
              0,
              0,
              cur.width * 2,
              cur.height * 2,
              0,
              0,
              cur.width,
              cur.height
            );
          }
          ctx.drawImage(
            oc,
            0,
            0,
            cur.width,
            cur.height,
            0,
            0,
            canvas.width,
            canvas.height
          );
          var base64Image = canvas.toDataURL("image/jpeg");

          console.log(base64Image);

          var filename = Date.now() + ".jpg";

          /*
          var rawResponse = await fetch("/api/save", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "img",
              filename: filename,
              data: base64Image,
            }),
          });
          var resp = await rawResponse.json();
          console.log(resp);
        

          setTimeout(() => {
            saving = false;
          }, 1000);

          if (resp.ok) {
            curItem[key].push({
              title: "",
              filename: "img/" + filename,
            });
            curItem = curItem;
          } else {
            alert(resp.msg);
          }

*/
          var file = base64ToFile(base64Image, filename);

          const promise = storage.createFile(
            "657257b8e3cc69765267",
            filename,
            file
          );

          promise.then(
            function (response) {
              console.log(response); // Success

              console.log(response.name);

              console.log(
                `https://cloud.appwrite.io/v1/storage/buckets/657257b8e3cc69765267/files/${response.name}/view?project=6555255e2967f4fed115`
              );

              curItem[key].push(response.name);
              curItem = curItem;
              let newData = curItem[key];

              /*
              const promise = databases.updateDocument(
                "blog",
                "posts",
                curItem.$id,
                {
                  images: newData,
                }
              );

              promise.then(
                function (response) {
                  console.log(response); // Success
                  saving = false;
                },
                function (error) {
                  console.log(error); // Failure
                  loading = false;
                }
              );
              */
            },
            function (error) {
              console.log(error); // Failure
            }
          );
        };

        img.src = URL.createObjectURL(e.target.files[0]);
      });
  });

  function chooseImage(key) {
    document.querySelector("#fileInput").click();
  }

  async function deleteImg(filename) {
    if (confirm("Are you sure you wish to delete this image?")) {
      let index = curItem[key].findIndex((x) => x.filename == filename);
      curItem[key].splice(index, 1);

      curItem = curItem;

      if (cfg.ssr) {
        var resp = await fetch("/api/delete", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filename: filename }),
        });
        var result = await resp.json();
      }
    }
  }

  function moveDown(filename) {
    let index = curItem[key].findIndex((x) => x.filename == filename);

    let from = index;
    let to = index + 1;

    // remove `from` item and store it
    var f = curItem[key].splice(from, 1)[0];
    // insert stored item into position `to`
    curItem[key].splice(to, 0, f);

    curItem = curItem;
  }

  function base64ToFile(base64Image, filename) {
    // Split the base64 string in data and contentType
    var block = base64Image.split(";");
    // Get the content type
    var mimeType = block[0].split(":")[1]; // In this case "image/jpeg"
    // get the real base64 content of the file
    var realData = block[1].split(",")[1]; // In this case "iVBORw0KGg...."

    // Convert to blob
    var blob = b64toBlob(realData, mimeType);

    // Create a File object
    var file = new File([blob], filename, { type: mimeType });

    return file;
  }

  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
</script>

<input
  type="file"
  id="fileInput"
  class="fileInput"
  accept="image/png, image/jpeg, image/gif"
  hidden
/>

<button class="btn btn-outline-secondary mt-3" on:click={() => chooseImage(key)}
  >{#if saving}<i class="fas fa-spinner fa-spin" />
  {:else}<i class="fas fa-image" />
  {/if}&nbsp;Choose image</button
>

<ul class="list-group mt-2">
  {#each curItem[key] as img}
    <li class="list-group-item d-flex justify-content-between" transition:fade>
      <div
        class="wdgt-box-img"
        style="background-image: url({cfg.img_url}{img.filename});"
      />
      <input
        type="text"
        class="form-control me-2"
        bind:value={img}
        placeholder="title"
      />

      <div class="btn-group">
        <button
          class="btn btn-outline-secondary"
          on:click={moveDown(img.filename)}
          title="Move down"
        >
          <i class="fas fa-caret-down" />
        </button>

        <button
          class="btn btn-outline-secondary"
          on:click={deleteImg(img.filename)}
          title="Delete"
        >
          <i class="fas fa-trash" />
        </button>
      </div>
    </li>
  {/each}
</ul>

<style>
  .btn-outline-secondary {
    border: 1px solid #ddd;
  }
</style>
