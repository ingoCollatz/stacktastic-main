<script lang="ts">
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
  };

  const inputs: InputConfig[] = [
    { id: "name", label: "Name", required: true },
    { id: "email", label: "Email", type: "email", required: true },
    {
      id: "message",
      label: "Message",
      type: "textarea",
      required: true,
      rows: 5,
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

<section class="w-full flex justify-center px-4 py-16 bg-white">
  <form
    on:submit|preventDefault={handleSubmit}
    class="w-full max-w-xl space-y-6"
    aria-labelledby="contact-form-title"
  >
    <fieldset class="space-y-6" disabled={isSubmitting}>
      <legend class="text-2xl font-bold text-gray-900 mb-4">Contact Me</legend>

      {#each inputs as input}
        <div>
          <label for={input.id} class="block text-sm font-medium text-gray-700">
            {input.label}
          </label>

          {#if input.type === "textarea"}
            <textarea
              id={input.id}
              name={input.id}
              rows={input.rows ?? 3}
              required={input.required}
              class="mt-1 block w-full border border-gray-300 p-2 rounded"
            ></textarea>
          {:else}
            <input
              type={input.type ?? "text"}
              id={input.id}
              name={input.id}
              required={input.required}
              class="mt-1 block w-full border border-gray-300 p-2 rounded"
            />
          {/if}
        </div>
      {/each}

      <cap-widget
        data-cap-api-endpoint="https://capjs.stacktastic.dev/ffeb0d0477/"
        bind:this={captchaEl}
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
