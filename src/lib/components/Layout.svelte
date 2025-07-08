<script>
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
</script>

<div class="min-h-screen flex flex-col">
  <Header />
  <main class="flex-grow">
    <slot />
  </main>
  <Footer />
</div>
