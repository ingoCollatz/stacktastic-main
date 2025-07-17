<script lang="ts">
  let success: boolean | null = null;
  let error: string | null = null;
  let captchaEl: HTMLElement | null = null;
  let isSubmitting = false;

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

        // Reset captcha widget by dispatching reset event on captcha element
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

<section class="w-full flex justify-center px-4 py-16 bg-white">
  <form
    on:submit|preventDefault={handleSubmit}
    class="w-full max-w-xl space-y-6"
    aria-labelledby="contact-form-title"
  >
    <fieldset class="space-y-6" disabled={isSubmitting}>
      <legend class="text-2xl font-bold text-gray-900 mb-4">Contact Me</legend>

      <div>
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Name</label
        >
        <input
          type="text"
          id="name"
          name="name"
          required
          class="mt-1 block w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email</label
        >
        <input
          type="email"
          id="email"
          name="email"
          required
          class="mt-1 block w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-gray-700"
          >Message</label
        >
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          class="mt-1 block w-full border border-gray-300 p-2 rounded"
        ></textarea>
      </div>

      <cap-widget
        data-cap-api-endpoint="https://capjs.stacktastic.dev/ffeb0d0477/"
      ></cap-widget>
    </fieldset>

    <div>
      <button
        type="submit"
        class="bg-blue-600 text-white font-semibold px-5 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </div>

    {#if success === true}
      <p class="text-green-600 mt-4" role="status">
        ✅ Message sent successfully!
      </p>
    {:else if success === false}
      <p class="text-red-600 mt-4" role="alert">❌ {error}</p>
    {/if}
  </form>
</section>
