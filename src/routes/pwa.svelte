<script lang="ts">
  import { onMount } from "svelte";

  $: display = false;
  onMount(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      display = true;
    });

    window.addEventListener("appinstalled", (event) => {
      console.log("👍", "appinstalled", event);
      // Clear the deferredPrompt so it can be garbage collected
      window.deferredPrompt = null;
    });
  });

  async function install(): Promise<void> {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      console.log("👎", "deferredPrompt is null");
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    display = false;
  }
</script>

{#if display}
  <button on:click={install}>Install</button>
{/if}

<style>
  button {
    margin-top: 1rem;
  }
</style>