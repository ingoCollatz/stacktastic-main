<script lang="ts">
  import SimpleIcon from "./SimpleIcon.svelte";

  interface $$Props {
    class?: string;
  }

  let className: string = "";
  export { className as class };
</script>

<SimpleIcon iconName="typescript" title="TypeScript" class={className} />
