<script lang="ts">
  import jokesFile from "$lib/jokes.txt?raw";
  import { onMount } from "svelte";
  import Header from "./header.svelte";

  const jokes = jokesFile.split("\n").map((joke: string) => joke.split("<>"));
  const warnings: string[] = [];

  $: setup = "";
  $: punchline = "";
  let cache: number;
  function randomJoke() {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    setup = joke[0];
    punchline = "...";
    if (cache) clearTimeout(cache);
    cache = setTimeout(() => {
      punchline = joke[1];
    }, 3000);
  }

  onMount(randomJoke);

  jokes.forEach((joke: string[], index: number) => {
    if (joke.length < 2) {
      warnings.push(`Joke ${index + 1} does not contain a placeholder.`);
    }
  });

  function shareJoke() {
    if (navigator.share) {
      console.log(setup, punchline);
      navigator
        .share({
          title: "Joke",
          text: setup + "\n" + punchline,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Web Share API not supported");
    }
  }
</script>

<Header />

<h1>Ready for a laugh?</h1>

<p>{setup}</p>
<p class:animate={punchline !== "..."}>{punchline}</p>
<button on:click={randomJoke}>Get Joke</button>
<button on:click={shareJoke}>Share</button>

{#if warnings.length > 0}
  <h2>Warnings</h2>
  <ul>
    {#each warnings as warning}
      <li>{warning}</li>
    {/each}
  </ul>
{/if}

<p class="footer">-- pool has {jokes.length} jokes --</p>

<style>
  button {
    display: inline;
  }
  .animate {
    color: var(--secondary-3);
    animation: fadeIn 1s;
  }
  .footer {
    color: var(--neutral-3);
    font-size: smaller;
    text-align: center;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
