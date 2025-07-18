<script lang="ts">
  import { scale, fade } from "svelte/transition";

  let success: boolean | null = null;
  let error: string | null = null;
  let captchaEl: HTMLElement | null = null;
  let isSubmitting = false;

  type InputConfig = {
    id: string;
    label: string;
    type?: string;
    required: boolean;
    rows?: number;
    placeholder?: string;
  };

  const inputs: InputConfig[] = [
    { id: "name", label: "Name", required: true, placeholder: "John Doe" },
    {
      id: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "john@example.com",
    },
    {
      id: "message",
      label: "Message",
      type: "textarea",
      required: true,
      rows: 5,
      placeholder: "Tell me about your project or just say hello!",
    },
  ];

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const formEl = event.target as HTMLFormElement;
    const formData = new FormData(formEl);

    isSubmitting = true;
    success = null;
    error = null;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        success = true;
        formEl.reset();

        captchaEl?.dispatchEvent(new CustomEvent("frc-captcha-reset"));
      } else {
        success = false;
        error = result.error || "An unknown error occurred.";
      }
    } catch (err) {
      success = false;
      error = "Network or server error. Please try again later.";
      console.error(err);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <script src="https://capjs.stacktastic.dev/assets/widget.js"></script>
</svelte:head>

<section id="contact" class="py-20">
  <div class="max-w-4xl mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold mb-6 text-brand-500">
        Get In Touch
      </h2>
      <div
        class="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-600 mx-auto rounded-full mb-4"
      ></div>
      <p class="text-lg text-gray-900 dark:text-gray-100/70 max-w-2xl mx-auto">
        Have a project in mind? Let's discuss how we can work together
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12 items-start">
      <!-- Contact Info -->
      <div class="space-y-8">
        <div
          class="bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50"
        >
          <h3 class="text-2xl font-bold text-brand-500 mb-6">Let's Connect</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            I'm always open to discussing new opportunities, interesting
            projects, or just having a chat about technology and development.
          </p>

          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <div
                class="bg-brand-500/10 dark:bg-brand-500/20 p-3 rounded-full"
              >
                <svg
                  class="w-6 h-6 text-brand-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-gray-100">
                  Email
                </div>
                <div class="text-gray-900 dark:text-gray-100/70">
                  hello@stacktastic.dev
                </div>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <div
                class="bg-brand-500/10 dark:bg-brand-500/20 p-3 rounded-full"
              >
                <svg
                  class="w-6 h-6 text-brand-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-gray-100">
                  Response Time
                </div>
                <div class="text-gray-900 dark:text-gray-100/70">
                  Usually within 24 hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div
        class="bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50"
      >
        <form
          on:submit|preventDefault={handleSubmit}
          class="space-y-6"
          aria-labelledby="contact-form-title"
        >
          <fieldset class="space-y-6" disabled={isSubmitting}>
            <legend class="text-2xl font-bold text-brand-500 mb-2"
              >Send a Message</legend
            >

            {#each inputs as input, index}
              <div in:scale={{ duration: 300, delay: index * 100 }}>
                <label
                  for={input.id}
                  class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2"
                >
                  {input.label}
                  {#if input.required}
                    <span class="text-red-500">*</span>
                  {/if}
                </label>

                {#if input.type === "textarea"}
                  <textarea
                    id={input.id}
                    name={input.id}
                    rows={input.rows ?? 3}
                    required={input.required}
                    placeholder={input.placeholder || ""}
                    class="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200 resize-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  ></textarea>
                {:else}
                  <input
                    type={input.type ?? "text"}
                    id={input.id}
                    name={input.id}
                    required={input.required}
                    placeholder={input.placeholder || ""}
                    class="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                {/if}
              </div>
            {/each}

            <div in:scale={{ duration: 300, delay: 300 }}>
              <cap-widget
                data-cap-api-endpoint="https://capjs.stacktastic.dev/ffeb0d0477/"
                bind:this={captchaEl}
              ></cap-widget>
            </div>
          </fieldset>

          <div in:scale={{ duration: 300, delay: 400 }}>
            <button
              type="submit"
              class="w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-brand-600 hover:to-brand-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isSubmitting}
            >
              {#if isSubmitting}
                <span class="flex items-center justify-center">
                  <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              {:else}
                Send Message
              {/if}
            </button>
          </div>

          {#if success === true}
            <div
              class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center space-x-3"
              role="status"
              in:fade={{ duration: 300 }}
            >
              <svg
                class="w-5 h-5 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="text-green-800 dark:text-green-200 font-medium"
                >Message sent successfully! I'll get back to you soon.</span
              >
            </div>
          {:else if success === false}
            <div
              class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center space-x-3"
              role="alert"
              in:fade={{ duration: 300 }}
            >
              <svg
                class="w-5 h-5 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="text-red-800 dark:text-red-200 font-medium"
                >{error}</span
              >
            </div>
          {/if}
        </form>
      </div>
    </div>
  </div>
</section>
