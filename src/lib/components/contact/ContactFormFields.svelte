<script lang="ts">
  import { scale, fade } from "svelte/transition";

  export let success: boolean | null = null;
  export let error: string | null = null;
  export let isSubmitting = false;
  export let onSubmit: (event: SubmitEvent) => Promise<void>;

  let captchaEl: HTMLElement | null = null;

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

  // Export captcha element for parent component
  export { captchaEl };
</script>

<div
  class="bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50"
>
  <form
    on:submit|preventDefault={onSubmit}
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
              class="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            ></textarea>
          {:else}
            <input
              type={input.type ?? "text"}
              id={input.id}
              name={input.id}
              required={input.required}
              placeholder={input.placeholder || ""}
              class="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
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
        class="w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-brand-600 hover:to-brand-700 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
        <span class="text-red-800 dark:text-red-200 font-medium">{error}</span>
      </div>
    {/if}
  </form>
</div>
