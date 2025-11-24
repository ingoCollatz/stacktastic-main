<script lang="ts">
  import { scale } from "svelte/transition";
  import { getFeaturedProjects } from "$lib/data/projects";

  let selectedProject: string | null = null;
  let projects = getFeaturedProjects();
</script>

<section id="projects" class="py-20">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-6 text-brand-500">
        Featured Projects
      </h2>
      <div
        class="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-600 mx-auto rounded-full mb-4"
      ></div>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Real-world projects that demonstrate modern web development and business solutions.
      </p>
    </div>

    <!-- Projects Grid -->
    <div class="grid gap-8 max-w-5xl mx-auto">
      {#each projects as project}
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
          in:scale={{ duration: 300 }}
        >
          <!-- Project Header -->
          <div class="flex flex-col md:flex-row md:items-start gap-6 mb-6">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <span class="px-3 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full font-medium">
                  Live
                </span>
              </div>
              <p class="text-brand-600 dark:text-brand-400 font-medium mb-3">
                {project.subtitle}
              </p>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          <!-- Tech Stack -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
              Tech Stack
            </h4>
            <div class="flex flex-wrap gap-2">
              {#each project.techStack as tech}
                <span class="px-3 py-1 bg-brand-100 dark:bg-brand-900/30 text-brand-800 dark:text-brand-300 rounded-full text-sm font-medium">
                  {tech}
                </span>
              {/each}
            </div>
          </div>

          <!-- Key Features -->
          <div class="mb-8">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Key Features
            </h4>
            <div class="grid md:grid-cols-2 gap-3">
              {#each project.features as feature}
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-brand-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                </div>
              {/each}
            </div>
          </div>

          <!-- Project Actions -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            {#if project.liveUrl}
              <button
                on:click={() => window.open(project.liveUrl, "_blank")}
                class="flex-1 inline-flex items-center justify-center px-6 py-3 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition-colors duration-200"
                aria-label="View live project"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                View Live Site
              </button>
            {/if}
            {#if project.githubUrl}
              <button
                on:click={() => window.open(project.githubUrl, "_blank")}
                class="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label="View source code on GitHub"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Code
              </button>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    <!-- Coming Soon Placeholder -->
    <div class="text-center mt-12">
      <div class="max-w-md mx-auto p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl">
        <div class="text-4xl mb-4">🚀</div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          More Projects Coming Soon
        </h4>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          Currently working on exciting new projects that will be showcased here.
        </p>
      </div>
    </div>
  </div>
</section>
