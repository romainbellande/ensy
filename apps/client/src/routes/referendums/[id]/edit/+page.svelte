<script lang="ts">
  import Form from '../../form.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Form referendum={data.referendum} />
