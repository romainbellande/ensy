<script lang="ts">
	import { Label } from '../Label'
	export let label: string;
	export let required = false;
	export let placeholder = '';
	export let name: string;
	export let type = 'text';
</script>

<Label text={label} {required}>
	<input class="input input-bordered w-full max-w-xs" {type} {name} {placeholder} {required} />
</Label>
