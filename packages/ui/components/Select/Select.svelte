<script lang="ts">
  import { _ } from 'svelte-i18n';
  import type { SelectOption } from './select-option.interface';
  let options: SelectOption[] = [];
</script>

<select class="select select-bordered w-full max-w-xs">
  {#each options as { text, value, disabled, selected }}
    <option {disabled} {selected} {value}>{$_(text)}</option>
  {/each}
</select>
