<script lang="ts">
  export let posts = [
    {
      title: "How I Built My Portfolio with SvelteKit",
      excerpt:
        "A behind-the-scenes look at designing and developing this site using modern web tech.",
      date: "2025-07-01",
      slug: "portfolio-with-sveltekit",
    },
    {
      title: "Why I Chose PostgreSQL + GraphQL",
      excerpt:
        "A quick write-up on my tech choices and how they simplified my backend.",
      date: "2025-06-15",
      slug: "postgresql-graphql-stack",
    },
  ];
</script>

<section id="blog" class="bg-gray-50 py-16 px-4">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-3xl font-bold mb-8">Latest Blog Posts</h2>

    <div class="grid md:grid-cols-2 gap-8">
      {#each posts as post}
        <a
          href={`/blog/${post.slug}`}
          class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 block bg-white"
        >
          <h3 class="text-xl font-semibold mb-1">{post.title}</h3>
          <p class="text-sm text-gray-600 mb-2">{post.date}</p>
          <p class="text-gray-700 text-sm">{post.excerpt}</p>
        </a>
      {/each}
    </div>

    <div class="mt-10">
      <a
        href="/blog"
        class="text-sm font-medium underline text-blue-600 hover:text-blue-800"
      >
        View all posts →
      </a>
    </div>
  </div>
</section>
