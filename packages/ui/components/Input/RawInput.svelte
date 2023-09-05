<script lang="ts">
  import { ErrorTooltip } from '../ErrorTooltip';
  export let required = false;
  export let placeholder = '';
  export let name: string;
  export let type = 'text';
</script>

<ErrorTooltip {name}>
  <input class="input input-bordered w-full" {type} {name} {placeholder} {required} />
</ErrorTooltip>
