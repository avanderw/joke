<script>
    import Pwa from "./pwa.svelte";
</script>
<div>
  <Pwa />
  <a href="https://avanderw.co.za"
    ><svg><use href="feather-sprite.svg#home" /></svg>Andrew</a
  >
  <a href="https://github.com/avanderw/joke">
    <svg><use href="feather-sprite.svg#github" /></svg>
    Source
  </a>
  <a href="https://tracking.avanderw.co.za/avanderw.co.za">
    <svg><use href="feather-sprite.svg#bar-chart-2" /></svg>
    Analytics
  </a>
</div>

<style>
  a {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 2rem;
    font-size: smaller;
  }
  svg {
    width: 1rem;
    height: 1rem;
  }
</style>
