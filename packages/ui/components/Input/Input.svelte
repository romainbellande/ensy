<script lang="ts">
  import { ValidationMessage } from '@felte/reporter-svelte';
  import { Label } from '../Label';
  import { _ } from 'svelte-i18n';
  export let label: string;
  export let required = false;
  export let placeholder = '';
  export let name: string;
  export let type = 'text';
</script>

<Label text={label} {required}>
  <input class="input input-bordered w-full max-w-xs" {type} {name} {placeholder} {required} />
  <ValidationMessage for={name} let:messages={message}>
    {#if message?.length > 0}
      <span class="text-xs text-error">{$_(message[0])}</span>
    {/if}
  </ValidationMessage>
</Label>
