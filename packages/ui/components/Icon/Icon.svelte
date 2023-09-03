<script lang="ts">
  import { icons, FeatherIconNames } from 'feather-icons';
  export let name: FeatherIconNames;
  export let height = 16;
  export let width = 16;
</script>

{@html icons[name].toSvg({ height, width, class: $$props.class })}
