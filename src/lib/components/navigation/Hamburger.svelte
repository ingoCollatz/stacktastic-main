<script lang="ts">
  export let open = false;
</script>

<svg
  viewBox="0 0 100 100"
  fill="none"
  stroke="currentColor"
  stroke-width="6"
  stroke-linecap="round"
  class="w-6 h-6 transition duration-75"
>
  <!-- Top line -->
  <path
    d={open ? "M 20,30 L 80,70" : "M 20,30 L 80,30"}
    class="transition-all duration-75"
  />
  <!-- Middle line -->
  <path d={open ? "" : "M 20,50 L 80,50"} class="transition-all duration-75" />
  <!-- Bottom line -->
  <path
    d={open ? "M 20,70 L 80,30" : "M 20,70 L 80,70"}
    class="transition-all duration-75"
  />
</svg>
