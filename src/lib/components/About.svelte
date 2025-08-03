<script lang="ts">
  import { fade } from "svelte/transition";
</script>

<section id="about" class="py-20 text-gray-900 dark:text-gray-100">
  <div class="max-w-4xl mx-auto px-4">
    <div class="text-center mb-12">
      <h2
        class="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100"
      >
        My Journey
      </h2>
      <div
        class="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-600 mx-auto rounded-full"
      ></div>
    </div>

    <div class="grid md:grid-cols-2 gap-12 items-center">
      <!-- Text Content -->
      <div class="space-y-6">
        <div
          class="bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50"
        >
          <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            I'm a curious developer who loves exploring the intersection of
            design, performance, and user experience through code. With close to
            3 years of professional experience, I specialize in crafting web
            applications with
            <span class="font-semibold text-brand-500">SvelteKit</span>,
            <span class="font-semibold text-brand-500">TypeScript</span>,
            <span class="font-semibold text-brand-500">PostgreSQL</span>, and
            <span class="font-semibold text-brand-500">GraphQL</span>.
          </p>
          <p
            class="text-lg leading-relaxed mt-6 text-gray-600 dark:text-gray-400"
          >
            My path started as a career changer without formal CS education,
            driven by curiosity and a passion for building things that matter. I
            learn by doing, experiment with new technologies, and believe the
            best way to grow is by sharing what you discover along the way.
          </p>
        </div>

        <!-- Key Stats -->
        <div class="grid grid-cols-3 gap-4 mt-8">
          <div
            class="text-center bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50"
          >
            <div class="text-2xl font-bold text-brand-500">3+</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Years Experience
            </div>
          </div>
          <div
            class="text-center bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50"
          >
            <div class="text-2xl font-bold text-brand-500">10+</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Projects Built
            </div>
          </div>
          <div
            class="text-center bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50"
          >
            <div class="text-2xl font-bold text-brand-500">∞</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Lines of Code
            </div>
          </div>
        </div>
      </div>

      <!-- Visual Element -->
      <div class="flex justify-center">
        <div class="relative">
          <div
            class="w-80 h-80 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full opacity-10 dark:opacity-20 absolute -top-4 -left-4"
          ></div>
          <div
            class="w-72 h-72 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center relative"
          >
            <div class="text-center">
              <div class="text-6xl mb-4">👨‍💻</div>
              <div class="text-xl font-semibold text-brand-500">
                Full Stack Developer
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Building the future, one line at a time
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
