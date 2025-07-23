<script lang="ts">
  import * as simpleIcons from "simple-icons";

  interface $$Props {
    iconName: string;
    title?: string;
    class?: string;
  }

  export let iconName: string;
  export let title: string = "";
  let className: string = "";
  export { className as class };

  // Map icon names to Simple Icons exports
  const iconMap: Record<string, any> = {
    svelte: simpleIcons.siSvelte,
    typescript: simpleIcons.siTypescript,
    graphql: simpleIcons.siGraphql,
    postgresql: simpleIcons.siPostgresql,
    tailwindcss: simpleIcons.siTailwindcss,
    nodedotjs: simpleIcons.siNodedotjs,
    docker: simpleIcons.siDocker,
    githubactions: simpleIcons.siGithubactions,
  };

  $: icon = iconMap[iconName];
</script>

{#if icon}
  <svg
    class={className}
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="#{icon.hex}"
  >
    {#if title}
      <title>{title}</title>
    {/if}
    <path d={icon.path} />
  </svg>
{/if}
