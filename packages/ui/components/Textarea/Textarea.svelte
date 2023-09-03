<script lang="ts">
  import { Label } from '../Label';
  export let label: string;
  export let required = false;
  export let placeholder = '';
  export let name: string;
</script>

<Label text={label} {required}>
  <textarea class="textarea textarea-bordered" {name} {placeholder} {required} />
</Label>
