<script lang="ts">
  export let size = 40;
  export let color = "white"; // Default to white for dark background
</script>

<!-- Apply text color to parent so SVG and span both inherit -->
<div class={`flex items-center gap-2 text-${color}`}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="none"
    width={size}
    height={size}
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M16 17L3 11l13-6 13 6-13 6z"
    />
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3 15.5l13 6 13-6"
    />
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3 20l13 6 13-6"
    />
  </svg>
  <span class="text-xl font-bold">stacktastic.dev</span>
</div>
