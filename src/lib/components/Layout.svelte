<script>
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

<div class="min-h-screen flex flex-col">
  <Header />
  <main class="flex-grow pt-20">
    <slot />
  </main>
  <Footer />
</div>
