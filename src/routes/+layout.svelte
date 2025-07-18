<script lang="ts">
  import "../app.css";
  import { theme } from "$lib/stores/theme";
  import { browser } from "$app/environment";

  let { children } = $props();

  // React to theme changes using Svelte 5 runes
  $effect(() => {
    if (browser) {
      if ($theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  });
</script>

<div
  class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300"
>
  {@render children()}
</div>
