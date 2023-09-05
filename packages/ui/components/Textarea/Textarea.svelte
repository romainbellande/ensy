<script lang="ts">
  import { ValidationMessage } from '@felte/reporter-svelte';
  import { cn } from 'browser-toolkit';
  import { _ } from 'svelte-i18n';
  import { Label } from '../Label';
  export let label: string;
  export let required = false;
  export let placeholder = '';
  export let name: string;
</script>

<ValidationMessage for={name} let:messages={message}>
  <Label text={label} {required}>
    <div class={cn('tooltip tooltip-error w-full', { 'tooltip-open': Boolean(message?.[0]) })} data-tip={$_(message?.[0])}>
      <textarea class="textarea textarea-bordered w-full" {name} {placeholder} {required} />
    </div>
  </Label>
</ValidationMessage>
