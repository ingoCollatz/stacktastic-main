<script lang="ts">
  import Logo from "./Logo.svelte";
  import { fade, slide } from "svelte/transition";
  import Hamburger from "./Hamburger.svelte";
  import { browser } from "$app/environment";

  let mobileMenuOpen = false;

  // Lock scroll when mobile menu is open
  $: if (browser && mobileMenuOpen) {
    document.body.classList.add("overflow-hidden");
  } else if (browser) {
    document.body.classList.remove("overflow-hidden");
  }
</script>

<nav
  in:fade={{ duration: 300 }}
  class="fixed top-0 left-0 w-full z-50 text-black shadow-md bg-white"
>
  <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
    <!-- Logo -->
    <Logo size={40} color="black" />

    <!-- Desktop Nav -->
    <ul class="hidden md:flex gap-6 text-sm font-medium">
      <li><a href="#about" class="hover:underline">About</a></li>
      <li><a href="#projects" class="hover:underline">Projects</a></li>
      <li><a href="#stack" class="hover:underline">Stack</a></li>
      <li><a href="#contact" class="hover:underline">Contact</a></li>
    </ul>

    <!-- Mobile Hamburger -->
    <button
      class="md:hidden"
      on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
      aria-label="Toggle navigation"
    >
      <Hamburger open={mobileMenuOpen} />
    </button>
  </div>

  <!-- Mobile Dropdown + Backdrop -->
  {#if mobileMenuOpen}
    <!-- Backdrop -->
    <button
      type="button"
      class="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
      transition:fade={{ duration: 200 }}
      on:click={() => (mobileMenuOpen = false)}
      aria-label="Close mobile menu"
    ></button>

    <!-- Dropdown Menu -->
    <div
      class="md:hidden absolute top-full left-0 w-full z-50 px-4 pb-4 shadow-lg bg-white"
      transition:slide={{ duration: 250 }}
    >
      <ul class="flex flex-col gap-4 text-sm font-medium">
        <li>
          <a
            href="#about"
            on:click={() => (mobileMenuOpen = false)}
            class="hover:underline">About</a
          >
        </li>
        <li>
          <a
            href="#projects"
            on:click={() => (mobileMenuOpen = false)}
            class="hover:underline">Projects</a
          >
        </li>
        <li>
          <a
            href="#stack"
            on:click={() => (mobileMenuOpen = false)}
            class="hover:underline">Stack</a
          >
        </li>
        <li>
          <a
            href="#contact"
            on:click={() => (mobileMenuOpen = false)}
            class="hover:underline">Contact</a
          >
        </li>
      </ul>
    </div>
  {/if}
</nav>
