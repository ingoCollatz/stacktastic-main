<script lang="ts">
  export let size = 40; // Optional prop to control icon size
  export let color = "black"; // Optional prop to control icon color
</script>

<div class="flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="none"
    width={size}
    height={size}
    class={`text-${color}`}
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
  <span class={`text-xl font-bold text-${color}`}>stacktastic.dev</span>
</div>
