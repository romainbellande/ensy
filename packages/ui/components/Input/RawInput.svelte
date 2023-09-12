<script lang="ts">
  import { ErrorTooltip } from '../ErrorTooltip';
  export let required = false;
  export let placeholder = '';
  export let name: string;
  export let type = 'text';
  export let disabled = false;
</script>

<ErrorTooltip {name}>
  <input class="input input-bordered w-full" {type} {name} {placeholder} {required} {disabled} />
</ErrorTooltip>
