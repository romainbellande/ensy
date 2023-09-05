<script lang="ts">
  import { ErrorTooltip } from '../ErrorTooltip';
  import { Label } from '../Label';
  export let label: string;
  export let required = false;
  export let placeholder = '';
  export let name: string;
</script>

<ErrorTooltip {name}>
  <Label text={label} {required}>
    <textarea class="textarea textarea-bordered w-full" {name} {placeholder} {required} />
  </Label>
</ErrorTooltip>
