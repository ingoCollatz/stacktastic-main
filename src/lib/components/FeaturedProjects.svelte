<script lang="ts">
  import { scale } from "svelte/transition";
</script>

<section id="projects" class="py-20">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-6 text-brand-500">
        Work in Progress
      </h2>
      <div
        class="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-600 mx-auto rounded-full mb-4"
      ></div>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        This playground is actively being built. Here's what's coming next...
      </p>
    </div>

    <!-- Development Status Card -->
    <div class="max-w-4xl mx-auto">
      <div
        class="bg-gradient-to-r from-brand-500/10 to-brand-600/10 dark:from-brand-500/20 dark:to-brand-600/20 rounded-2xl p-8 border border-brand-500/20 dark:border-brand-500/30"
        in:scale={{ duration: 300 }}
      >
        <div class="text-center mb-8">
          <div class="text-6xl mb-4">🚧</div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Under Construction
          </h3>
          <p
            class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            I'm currently rebuilding this site from the ground up with a focus
            on authenticity and genuine experimentation. This space will
            showcase real projects as I build and learn from them.
          </p>
        </div>

        <!-- Planned Features Grid -->
        <div class="grid md:grid-cols-3 gap-6 mb-8">
          <div class="text-center">
            <div
              class="w-16 h-16 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-brand-600 dark:text-brand-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
              Blog Section
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Insights and learnings from my development journey
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-brand-600 dark:text-brand-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                ></path>
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
              Project Lab
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Live experiments and prototypes as I build them
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-brand-600 dark:text-brand-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z"
                ></path>
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
              Real Projects
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Meaningful work and learning experiences to share
            </p>
          </div>
        </div>

        <!-- Progress Indicator -->
        <div class="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300"
              >Current Progress</span
            >
            <span class="text-sm text-brand-600 dark:text-brand-400">~30%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              class="bg-gradient-to-r from-brand-500 to-brand-600 h-2 rounded-full"
              style="width: 30%"
            ></div>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Foundation complete, now building the interesting parts...
          </p>
        </div>
      </div>
    </div>

    <!-- Follow the Journey -->
    <div class="text-center mt-12">
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        Want to follow along as I build this?
      </p>
      <button
        on:click={() =>
          window.open(
            "https://github.com/ingoCollatz/stacktastic-main",
            "_blank"
          )}
        class="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
        aria-label="View source code on GitHub"
      >
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
        View Source Code
      </button>
    </div>
  </div>
</section>
