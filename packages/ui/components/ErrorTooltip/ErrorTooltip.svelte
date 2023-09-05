<script lang="ts">
  import { ValidationMessage } from '@felte/reporter-svelte';
  import { cn } from 'browser-toolkit';
  import { _ } from 'svelte-i18n';
  export let name: string;
</script>

<ValidationMessage for={name} let:messages={message}>
  <div
    class={cn('tooltip tooltip-error', { 'tooltip-open': Boolean(message?.[0]) })}
    data-tip={$_(message?.[0])}
  >
    <slot />
  </div>
</ValidationMessage>
