<script lang="ts">
  import { Label } from '../Label';
  import RawInput from './RawInput.svelte';

  export let label: string | undefined = undefined;
  export let required = false;
  export let placeholder = '';
  export let name: string;
  export let type = 'text';
  export let disabled = false;
</script>

{#if label}
  <Label text={label} {required}>
    <RawInput {name} {required} {placeholder} {type} {disabled} />
  </Label>
{:else}
  <RawInput {name} {required} {placeholder} {type} />
{/if}
