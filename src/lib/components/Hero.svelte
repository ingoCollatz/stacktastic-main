<section
  class="relative py-24 md:py-32 overflow-hidden transition-colors duration-300"
>
  <div class="relative max-w-5xl mx-auto text-center px-6">
    <div class="animate-fade-in-up">
      <!-- Hero Badge -->
      <div
        class="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 dark:bg-brand-400/20 rounded-full border border-brand-500/20 dark:border-brand-400/30 mb-8"
      >
        <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        <span class="text-sm font-medium text-brand-600 dark:text-brand-400"
          >Building & experimenting</span
        >
      </div>

      <!-- Main Heading with enhanced typography -->
      <h1
        class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight transition-colors duration-300 text-gray-900 dark:text-white mb-6"
      >
        Hi, I'm <span class="text-brand-500 dark:text-brand-400">Ingo</span> —
        <br class="hidden sm:block" />
        <span
          class="bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent"
        >
          Digital Craftsperson
        </span>
        <br class="hidden sm:block" />
        & Code Explorer
      </h1>

      <!-- Enhanced description with tech stack highlights -->
      <div class="max-w-3xl mx-auto mb-12">
        <p
          class="text-lg md:text-xl leading-relaxed transition-colors duration-300 text-gray-700 dark:text-gray-300 mb-6"
        >
          Welcome to my digital playground where I explore web technologies,
          experiment with new ideas, and share what I discover along the way
        </p>

        <!-- Tech Stack Visual Pills -->
        <div class="flex flex-wrap justify-center gap-3 mb-8">
          <span
            class="px-4 py-2 bg-orange-500/10 dark:bg-orange-400/20 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium border border-orange-500/20 dark:border-orange-400/30"
          >
            SvelteKit
          </span>
          <span
            class="px-4 py-2 bg-blue-500/10 dark:bg-blue-400/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium border border-blue-500/20 dark:border-blue-400/30"
          >
            TypeScript
          </span>
          <span
            class="px-4 py-2 bg-pink-500/10 dark:bg-pink-400/20 text-pink-600 dark:text-pink-400 rounded-full text-sm font-medium border border-pink-500/20 dark:border-pink-400/30"
          >
            GraphQL
          </span>
          <span
            class="px-4 py-2 bg-emerald-500/10 dark:bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/20 dark:border-emerald-400/30"
          >
            PostgreSQL
          </span>
        </div>
      </div>

      <!-- Enhanced CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#projects"
          class="group inline-flex items-center px-8 py-4 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Explore My Lab
          <svg
            class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
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
        <a
          href="#contact"
          class="group inline-flex items-center px-8 py-4 border-2 border-brand-500 text-brand-500 dark:text-brand-400 dark:border-brand-400 rounded-lg font-semibold hover:bg-brand-500 hover:text-white dark:hover:bg-brand-400 dark:hover:text-gray-900 transform hover:scale-105 transition-all duration-200"
        >
          Let's Connect
          <svg
            class="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </a>
      </div>

      <!-- Quick Navigation -->
      <div
        class="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50"
      >
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          What you'll find here
        </p>
        <div class="flex flex-wrap justify-center gap-6">
          <a
            href="#projects"
            class="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors duration-200 font-medium hover:underline decoration-2 underline-offset-4"
          >
            Experiments
          </a>
          <a
            href="#stack"
            class="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors duration-200 font-medium hover:underline decoration-2 underline-offset-4"
          >
            Tech Playground
          </a>
          <a
            href="#about"
            class="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors duration-200 font-medium hover:underline decoration-2 underline-offset-4"
          >
            My Journey
          </a>
          <a
            href="#contact"
            class="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors duration-200 font-medium hover:underline decoration-2 underline-offset-4"
          >
            Connect
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }
</style>
