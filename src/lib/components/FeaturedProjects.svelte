<script lang="ts">
  import { scale } from "svelte/transition";

  export let projects = [
    {
      title: "Decentralized Finance Dashboard",
      description:
        "A full-stack dApp for tracking and managing DeFi investments across chains.",
      link: "#",
      tech: ["SvelteKit", "TypeScript", "Web3.js"],
      status: "Live",
      icon: "💰",
    },
    {
      title: "Portfolio CMS Backend",
      description:
        "GraphQL + PostgreSQL backend powering blog and projects with a clean API.",
      link: "#",
      tech: ["GraphQL", "PostgreSQL", "Node.js"],
      status: "Production",
      icon: "🔧",
    },
    {
      title: "AI-Powered Image Annotator",
      description:
        "A lightweight, AI-assisted image tagging tool built with SvelteKit and TensorFlow.js.",
      link: "#",
      tech: ["SvelteKit", "TensorFlow.js", "Python"],
      status: "Beta",
      icon: "🤖",
    },
  ];
</script>

<section id="projects" class="py-20">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-6 text-brand-500">
        Featured Projects
      </h2>
      <div
        class="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-600 mx-auto rounded-full mb-4"
      ></div>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        A showcase of my recent work and personal projects
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each projects as project, index}
        <div
          class="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-all duration-300 transform hover:-translate-y-2"
          in:scale={{ duration: 300, delay: index * 100 }}
        >
          <!-- Project Header -->
          <div
            class="bg-gradient-to-r from-brand-500/10 to-brand-600/10 dark:from-brand-500/20 dark:to-brand-600/20 p-6 relative"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="text-4xl">{project.icon}</div>
              <span
                class="px-3 py-1 text-xs font-semibold bg-brand-500/20 text-brand-500 rounded-full"
              >
                {project.status}
              </span>
            </div>
            <h3
              class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-brand-500 transition-colors duration-300"
            >
              {project.title}
            </h3>
          </div>

          <!-- Project Content -->
          <div class="p-6">
            <p
              class="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed"
            >
              {project.description}
            </p>

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2 mb-6">
              {#each project.tech as tech}
                <span
                  class="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full font-medium"
                >
                  {tech}
                </span>
              {/each}
            </div>

            <!-- Project Link -->
            <a
              href={project.link}
              class="inline-flex items-center text-brand-500 hover:text-brand-600 font-semibold transition-colors duration-200 group-hover:translate-x-1 transform"
            >
              View Project
              <svg
                class="ml-2 w-4 h-4 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          <!-- Hover Effect Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-brand-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          ></div>
        </div>
      {/each}
    </div>

    <!-- View More Projects -->
    <div class="text-center mt-12">
      <a
        href="#top"
        class="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-brand-500 dark:text-brand-400 border-2 border-brand-500 dark:border-brand-400 rounded-lg font-semibold hover:bg-brand-500 hover:dark:bg-brand-400 hover:text-white hover:dark:text-gray-900 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        View All Projects
        <svg
          class="ml-2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </a>
    </div>
  </div>
</section>
