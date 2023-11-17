<script lang="ts">
  import { cn } from 'browser-toolkit';

  export let variant:
    | 'btn-default'
    | 'btn-neutral'
    | 'btn-primary'
    | 'btn-secondary'
    | 'btn-accent'
    | 'btn-ghost'
    | 'btn-link' = 'btn-primary';

  export let type: 'submit' | 'button' | 'modal' = 'button';
  export let outline: boolean = false;
</script>

<button
  data-testid="button"
  type={type === 'modal' ? undefined : type}
  class={cn('btn capitalize-first', variant, { 'btn-outline': outline })}
  on:click><slot /></button
>
