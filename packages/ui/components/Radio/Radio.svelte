<script lang="ts">
  import type { RadioItem } from './radio-item.interface';
  import { _ } from 'svelte-i18n';
  export let items: RadioItem[];
  export let name: string;
</script>

<div class={$$props.class}>
  {#each items as { text, value }}
    <div class="form-control">
      <label class="label cursor-pointer space-x-4">
        <span class="label-text">{$_(text)}</span>
        <input class="radio checked:bg-primary h-4 w-4" type="radio" {name} {value} />
      </label>
    </div>
  {/each}
</div>
