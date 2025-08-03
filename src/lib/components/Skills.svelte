<script lang="ts">
  import { scale } from "svelte/transition";
  import {
    Svelte,
    TypeScript,
    GraphQL,
    PostgreSQL,
    TailwindCSS,
    NodeJS,
    Docker,
    GitHub,
  } from "./icons";
  import type { ComponentType } from "svelte";

  interface Skill {
    name: string;
    component: ComponentType;
  }

  const skills: Skill[] = [
    {
      name: "SvelteKit",
      component: Svelte,
    },
    {
      name: "TypeScript",
      component: TypeScript,
    },
    { name: "GraphQL", component: GraphQL },
    {
      name: "PostgreSQL",
      component: PostgreSQL,
    },
    {
      name: "Tailwind CSS",
      component: TailwindCSS,
    },
    {
      name: "Node.js",
      component: NodeJS,
    },
    { name: "Docker", component: Docker },
    {
      name: "GitHub Actions",
      component: GitHub,
    },
  ];

  let hoveredSkill: string | null = null;
</script>

<section id="stack" class="py-20 text-gray-900 dark:text-gray-100">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-6 text-brand-500">
        My Toolkit
      </h2>
      <div
        class="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-600 mx-auto rounded-full mb-4"
      ></div>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Tools and technologies I love experimenting with
      </p>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {#each skills as skill, index}
        <div
          class="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
          role="button"
          tabindex="0"
          aria-label="Skill: {skill.name}"
          on:mouseenter={() => (hoveredSkill = skill.name)}
          on:mouseleave={() => (hoveredSkill = null)}
          on:focus={() => (hoveredSkill = skill.name)}
          on:blur={() => (hoveredSkill = null)}
          in:scale={{ duration: 300, delay: index * 50 }}
        >
          <!-- Background glow effect -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-brand-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>

          <div class="relative flex flex-col items-center text-center">
            <div
              class="mb-4 transform group-hover:scale-110 transition-transform duration-300"
            >
              <svelte:component
                this={skill.component}
                class="w-12 h-12 group-hover:drop-shadow-lg transition-all duration-300"
              />
            </div>
            <span
              class="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-brand-500 transition-colors duration-300"
            >
              {skill.name}
            </span>

            <!-- Skill level indicator -->
            <div
              class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-3 overflow-hidden"
            >
              <div
                class="bg-gradient-to-r from-brand-500 to-brand-600 h-1 rounded-full transition-all duration-500 {hoveredSkill ===
                skill.name
                  ? 'w-full'
                  : 'w-0'}"
              ></div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Additional info -->
    <div class="mt-16 text-center">
      <div
        class="bg-gradient-to-r from-brand-500/10 to-brand-600/10 dark:from-brand-500/20 dark:to-brand-600/20 rounded-2xl p-8 border border-brand-500/20 dark:border-brand-500/30"
      >
        <p class="text-lg text-gray-800 dark:text-gray-200 mb-4">
          Always learning and exploring new technologies
        </p>
        <div
          class="flex justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400"
        >
          <span>📚 Currently learning: Rust</span>
          <span>•</span>
          <span>🎯 Next up: Three.js</span>
        </div>
      </div>
    </div>
  </div>
</section>
