<script lang="ts">
  import Icon from "@iconify/svelte";

  const skills = [
    { name: "SvelteKit", icon: "simple-icons:svelte" },
    { name: "TypeScript", icon: "simple-icons:typescript" },
    { name: "GraphQL", icon: "simple-icons:graphql" },
    { name: "PostgreSQL", icon: "simple-icons:postgresql" },
    { name: "Tailwind CSS", icon: "simple-icons:tailwindcss" },
    { name: "Node.js", icon: "simple-icons:nodedotjs" },
    { name: "Docker", icon: "simple-icons:docker" },
    { name: "GitHub Actions", icon: "simple-icons:githubactions" },
  ];
</script>

<section id="skills" class="py-20 bg-gray-100 text-black">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-10">My Toolbox</h2>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-center"
    >
      {#each skills as { name, icon }}
        <div class="flex flex-col items-center">
          <Icon {icon} class="w-12 h-12 mb-2" />
          <span class="text-sm font-medium">{name}</span>
        </div>
      {/each}
    </div>
  </div>
</section>
