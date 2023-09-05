<script lang="ts">
  import RawInput from './RawInput.svelte';
  import { Label } from '../Label';
  export let label: string | undefined = undefined;
  export let required = false;
  export let placeholder = '';
  export let name: string;
  export let type = 'text';
</script>

{#if label}
  <Label text={label} {required}>
    <RawInput {name} {required} {placeholder} {type} />
  </Label>
{:else}
  <RawInput {name} {required} {placeholder} {type} />
{/if}
