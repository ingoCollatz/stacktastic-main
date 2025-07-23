<script lang="ts">
  import { onMount } from "svelte";
  import ContactInfo from "./contact/ContactInfo.svelte";
  import ContactFormFields from "./contact/ContactFormFields.svelte";

  let success: boolean | null = null;
  let error: string | null = null;
  let captchaEl: HTMLElement | null = null;
  let isSubmitting = false;
  let csrfToken = "";

  // Generate CSRF token on component mount
  onMount(async () => {
    try {
      const response = await fetch("/api/csrf-token");
      const data = await response.json();
      csrfToken = data.token;
    } catch (err) {
      console.error("Failed to get CSRF token:", err);
    }
  });

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const formEl = event.target as HTMLFormElement;
    const formData = new FormData(formEl);

    // Add CSRF token to form data
    if (csrfToken) {
      formData.append("csrf-token", csrfToken);
    }

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

        // Refresh CSRF token after successful submission
        try {
          const tokenResponse = await fetch("/api/csrf-token");
          const tokenData = await tokenResponse.json();
          csrfToken = tokenData.token;
        } catch (err) {
          console.error("Failed to refresh CSRF token:", err);
        }
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
      <ContactInfo />

      <!-- Contact Form -->
      <ContactFormFields
        {success}
        {error}
        {isSubmitting}
        onSubmit={handleSubmit}
        bind:captchaEl
      />
    </div>
  </div>
</section>
