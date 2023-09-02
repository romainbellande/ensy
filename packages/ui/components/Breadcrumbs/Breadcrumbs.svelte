<script lang="ts">
  import type { BreadcrumbItem } from './breadcrumb-item.interface';
  import { default as AppBreadcrumbItem } from './BreadcrumbItem.svelte';
  export let items: BreadcrumbItem[] = [];
  export let home: BreadcrumbItem;
</script>

<div class="text-sm breadcrumbs">
  <ul>
    <AppBreadcrumbItem href={home.href}>{home.text}</AppBreadcrumbItem>
    {#each items as item}
      <AppBreadcrumbItem href={item.href}>{item.text}</AppBreadcrumbItem>
    {/each}
  </ul>
</div>
