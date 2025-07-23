<script lang="ts">
  import SimpleIcon from "./SimpleIcon.svelte";

  interface $$Props {
    class?: string;
  }

  let className: string = "";
  export { className as class };
</script>

<SimpleIcon iconName="tailwindcss" title="Tailwind CSS" class={className} />
