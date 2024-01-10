<script>
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte'
    
    export let curItem;
    export let key;
    
    let saving = false;
    
    onMount( async () => {
        document.getElementById("fileInput").addEventListener("change", async function (e) {
          saving = true;
      
          var file = e.target.files[0];
          var filename = Date.now() + "_" + file.name;

          // Check file type
          var allowedExtensions = /(\.pdf|\.doc|\.docx|\.zip)$/i;
          if(!allowedExtensions.exec(filename)){
            alert('Invalid file type. Only PDF, DOC, DOCX and ZIP files are allowed.');
            saving = false;
            return;
          }

          // Check file size (4MB = 4*1024*1024)
          if(file.size > 4*1024*1024){
            alert('File is too large. Maximum file size is 4MB.');
            saving = false;
            return;
          }
      
          var formData = new FormData();
          formData.append('type', 'file');
          formData.append('filename', filename);
          formData.append('file', file);
      
          var rawResponse = await fetch("/api/file", {
              method: "POST",
              body: formData,
          });
          var resp = await rawResponse.json();
          console.log(resp);

          saving = false;

          if(resp.ok){
            curItem[key] = cfg.img_url + resp.filename;
            curItem = curItem;
          }else{
            alert(resp.msg);
          }
            
         
        });
    });
    
    function chooseFile(key) {
        document.querySelector("#fileInput").click();
    }
    

</script>
      
<input
  type="file"
  id="fileInput"
  class="fileInput"
  accept=".pdf,.doc,.docx,.zip"
  hidden
/>


<button class="wdgt-btn-outline-secondary wdgt-w-170" on:click={()=>chooseFile(key)}>{#if saving}<i class="fas fa-spinner fa-spin"></i> {:else}<i class="fas fa-file"></i> {/if} &nbsp;Choose file</button>
<input type="text" placeholder="Copy the link to the file here" class="wdgt-form-control" bind:value={curItem[key]} />
<div class="wdgt-small">Allowed: .pdf, .doc, .docx, .zip - max. 4MB</div> 


  <!--
    {#each curItem[key] as img}
    <div class="wdgt-box" transition:fade>
        <div
          class="wdgt-box-img"
          style="background-image: url({img.filename});"
        ></div>
        <input
          type="text"
          class="wdgt-form-control wdgt-mb-0"
          bind:value={img.title}
          placeholder="title"
        />
    
        <button
          class="wdgt-btn-outline-secondary"
          on:click={moveDown(img.filename)}
          title="Move down"
        >
          <i class="fas fa-caret-down"></i>
        </button>
    
        <button
          class="wdgt-btn-outline-secondary wdgt-btn-danger"
          on:click={deleteImg(img.filename)}
          title="Delete"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    {/each}
    -->