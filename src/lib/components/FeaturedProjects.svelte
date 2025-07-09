<script lang="ts">
  export let projects = [
    {
      title: "Decentralized Finance Dashboard",
      description:
        "A full-stack dApp for tracking and managing DeFi investments across chains.",
      link: "#",
    },
    {
      title: "Portfolio CMS Backend",
      description:
        "GraphQL + PostgreSQL backend powering blog and projects with a clean API.",
      link: "#",
    },
    {
      title: "AI-Powered Image Annotator",
      description:
        "A lightweight, AI-assisted image tagging tool built with SvelteKit and TensorFlow.js.",
      link: "#",
    },
  ];
</script>

<section id="projects" class="bg-gray-100 py-16 px-4">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-3xl font-bold mb-8">Featured Projects</h2>

    <div class="grid md:grid-cols-3 gap-8">
      {#each projects as project}
        <a
          href={project.link}
          class="border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 block"
        >
          <h3 class="text-xl font-semibold mb-2">{project.title}</h3>
          <p class="text-sm text-gray-700">{project.description}</p>
        </a>
      {/each}
    </div>
  </div>
</section>
