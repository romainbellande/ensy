<script lang="ts">
  import { icons, FeatherIconNames } from 'feather-icons';
    import { createEventDispatcher } from 'svelte';
  export let name: FeatherIconNames;

  const dispatch = createEventDispatcher();
  const onClick = () => dispatch('click');
</script>

<button on:click={onClick}>
  {@html icons[name].toSvg()}
</button>
