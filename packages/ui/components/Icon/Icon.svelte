<script lang="ts">
  /* eslint svelte/no-at-html-tags: "off" */
  import type { FeatherIconNames } from 'feather-icons';
  import { icons } from 'feather-icons';

  export let name: FeatherIconNames;
  export let height = 16;
  export let width = 16;
</script>

{@html icons[name].toSvg({ height, width, class: $$props.class })}
