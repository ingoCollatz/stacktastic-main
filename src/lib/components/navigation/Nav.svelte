<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
  import { fade, slide } from "svelte/transition";
  import Hamburger from "$lib/components/navigation/Hamburger.svelte";
  import { browser } from "$app/environment";

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
  class="fixed top-0 left-0 w-full z-50 text-black shadow-md bg-white"
>
  <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2" aria-label="Go to homepage">
      <Logo size={40} color="black" />
    </a>

    <!-- Desktop Navigation -->
    <ul class="hidden md:flex gap-6 text-sm font-medium">
      {#each navItems as item (item.href)}
        <li>
          <a
            href={item.href}
            class="hover:underline transition-colors duration-200"
          >
            {item.label}
          </a>
        </li>
      {/each}
    </ul>

    <!-- Mobile Hamburger Button -->
    <button
      class="md:hidden focus:outline-none p-1"
      on:click={toggleMobileMenu}
      aria-label="Toggle navigation"
      aria-expanded={mobileMenuOpen}
    >
      <Hamburger open={mobileMenuOpen} />
    </button>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <!-- Backdrop -->
    <button
      type="button"
      class="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
      transition:fade={{ duration: 200 }}
      on:click={closeMobileMenu}
      aria-label="Close mobile menu"
    ></button>

    <!-- Mobile Navigation Dropdown -->
    <div
      class="md:hidden absolute top-full left-0 w-full z-50 px-4 pb-4 shadow-lg bg-white border-t border-gray-100"
      transition:slide={{ duration: 250 }}
    >
      <ul class="flex flex-col gap-4 text-sm font-medium py-4">
        {#each navItems as item (item.href)}
          <li>
            <a
              href={item.href}
              on:click={handleNavClick}
              class="block py-2 px-3 rounded-md hover:bg-gray-50 hover:underline transition-colors duration-200"
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</nav>
