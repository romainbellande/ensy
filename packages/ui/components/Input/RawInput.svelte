<script lang="ts">
  import { ValidationMessage } from '@felte/reporter-svelte';
  import { cn } from 'browser-toolkit';
  import { _ } from 'svelte-i18n';
  export let required = false;
  export let placeholder = '';
  export let name: string;
  export let type = 'text';
</script>

<ValidationMessage for={name} let:messages={message}>
  <div class={cn('tooltip tooltip-error', { 'tooltip-open': Boolean(message?.[0]) })} data-tip={$_(message?.[0])}>
    <input class="input input-bordered w-full max-w-xs" {type} {name} {placeholder} {required} />
  </div>
</ValidationMessage>

