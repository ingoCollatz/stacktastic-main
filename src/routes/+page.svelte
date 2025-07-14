<script>
  import Layout from "$lib/components/Layout.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Skills from "$lib/components/Skills.svelte";
  import CallToAction from "$lib/components/CallToAction.svelte"; // your blog preview
  import FeaturedProjects from "$lib/components/FeaturedProjects.svelte";
  import About from "$lib/components/About.svelte";
  import ContactForm from "$lib/components/ContactForm.svelte";
</script>

<Layout>
  <Hero />
  <About />
  <Skills />
  <FeaturedProjects />
  <CallToAction />
  <ContactForm />
</Layout>
