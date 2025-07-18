<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
  import { fade, slide } from "svelte/transition";
  import Hamburger from "$lib/components/navigation/Hamburger.svelte";
  import { browser } from "$app/environment";
  import { theme } from "$lib/stores/theme";

  // Navigation items configuration
  const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#stack", label: "Stack" },
    { href: "#contact", label: "Contact" },
  ];

  let mobileMenuOpen = false;

  // Lock scroll when mobile menu is open
  $: if (browser) {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }

  // Handle mobile menu toggle
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  // Close mobile menu
  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  // Handle navigation click
  function handleNavClick() {
    closeMobileMenu();
  }
</script>

<nav
  in:fade={{ duration: 300 }}
  class="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 bg-white/90 dark:bg-gray-900/90 border-gray-200/50 dark:border-gray-700/50"
>
  <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2" aria-label="Go to homepage">
      <Logo size={40} color={$theme === "dark" ? "white" : "black"} />
    </a>

    <!-- Desktop Navigation -->
    <ul class="hidden md:flex gap-6 text-sm font-medium items-center">
      {#each navItems as item (item.href)}
        <li>
          <a
            href={item.href}
            class="hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-200 text-gray-700 dark:text-gray-300"
          >
            {item.label}
          </a>
        </li>
      {/each}

      <!-- Theme Toggle Button -->
      <li>
        <button
          on:click={theme.toggle}
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {#if $theme === "light"}
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          {:else}
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          {/if}
        </button>
      </li>
    </ul>

    <!-- Mobile Hamburger Button -->
    <div class="md:hidden flex items-center gap-2">
      <!-- Mobile Theme Toggle -->
      <button
        on:click={theme.toggle}
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        aria-label="Toggle theme"
      >
        {#if $theme === "light"}
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        {:else}
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        {/if}
      </button>

      <button
        class="focus:outline-none p-1"
        on:click={toggleMobileMenu}
        aria-label="Toggle navigation"
        aria-expanded={mobileMenuOpen}
      >
        <Hamburger open={mobileMenuOpen} />
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <!-- Mobile Navigation Dropdown -->
    <div
      class="md:hidden absolute top-full left-0 w-full z-50 px-4 pb-4 bg-white dark:bg-gray-900/90 border-b border-gray-200/50 dark:border-gray-700/50"
      transition:slide={{ duration: 250 }}
    >
      <ul class="flex flex-col gap-4 text-sm font-medium py-4">
        {#each navItems as item (item.href)}
          <li>
            <a
              href={item.href}
              on:click={handleNavClick}
              class="block py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-200 text-gray-700 dark:text-gray-300"
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</nav>

<!-- Mobile Menu Backdrop  -->
{#if mobileMenuOpen}
  <div
    class="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-black/40 dark:bg-black/60 backdrop-blur-sm md:hidden"
    transition:fade={{ duration: 200 }}
    on:click={closeMobileMenu}
    on:keydown={(e) => e.key === "Escape" && closeMobileMenu()}
    role="button"
    tabindex="0"
    aria-label="Close mobile menu"
  ></div>
{/if}
