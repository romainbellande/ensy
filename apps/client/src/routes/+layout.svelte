<script lang="ts">
  import type { BreadcrumbItem } from 'ui';
  import { Breadcrumbs, Navbar, Sidenav } from 'ui';

  import { page } from '$app/stores';

  $: pathname = $page.url.pathname;

  $: breadcrumbs = pathname
    .split('/')
    .filter(Boolean)
    .map<BreadcrumbItem>((path) => ({ text: path, href: pathname.split(path)[0] + path }));
</script>

<div>
  <Navbar />
  <Sidenav />
  <div class="pt-28 pl-72 min-h-screen flex flex-col w-screen space-y-4">
    <Breadcrumbs home={{ href: '/', text: 'home' }} items={breadcrumbs} />
    <slot />
  </div>
</div>
