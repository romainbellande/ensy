<script lang="ts">
  import { _ } from 'svelte-i18n';

  export let text: string;
  export let required = false;
</script>

<label class="flex flex-col space-y-2 w-full">
  <span class="flex space-x-1 font-medium">
    <span class="capitalize-first">{$_(text)}</span>
    {#if required}
      <span class="text-red-700">*</span>
    {/if}
  </span>
  <slot />
</label>
