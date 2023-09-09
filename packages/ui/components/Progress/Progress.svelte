<script lang="ts">
  import { cn } from 'browser-toolkit';

  export let value: number;
  export let max: number;
  export let variant:
    | 'progress-primary'
    | 'progress-secondary'
    | 'progress-accent'
    | 'progress-info'
    | 'progress-success'
    | 'progress-warning'
    | 'progress-error' = 'progress-primary';
  export let info: string | undefined = undefined;
</script>

<div class="space-x-4 flex items-center">
  <progress class={cn('progress w-56 relative', variant)} {value} {max} />
  {#if info}
    <span class="text-xs">{info}</span>
  {/if}
</div>
