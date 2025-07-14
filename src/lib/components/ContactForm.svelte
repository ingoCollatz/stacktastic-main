<script lang="ts">
  export let form;
</script>

<section class="w-full flex justify-center px-4 py-16 bg-white">
  <form
    method="POST"
    class="w-full max-w-xl space-y-6"
    aria-labelledby="contact-form-title"
  >
    <fieldset class="space-y-6">
      <legend
        id="contact-form-title"
        class="text-2xl font-bold text-gray-900 mb-4"
      >
        Contact Me
      </legend>

      <div>
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Name</label
        >
        <input
          type="text"
          id="name"
          name="name"
          required
          class="mt-1 block w-full"
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
          class="mt-1 block w-full"
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
          class="mt-1 block w-full"
        ></textarea>
      </div>
    </fieldset>

    <div>
      <button
        type="submit"
        class="bg-blue-600 text-white font-semibold px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Send
      </button>
    </div>

    {#if form?.success}
      <p class="text-green-600 mt-4" role="status">
        ✅ Message sent successfully!
      </p>
    {:else if form?.error}
      <p class="text-red-600 mt-4" role="alert">❌ {form.error}</p>
    {/if}
  </form>
</section>
