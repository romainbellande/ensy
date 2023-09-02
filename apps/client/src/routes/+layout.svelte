<script lang="ts">
  import { Navbar, Sidenav, Breadcrumbs } from 'ui';
  import type { BreadcrumbItem } from 'ui';
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
  <div class="pt-28 pl-72 min-h-screen flex flex-col w-screen">
    <Breadcrumbs home={{ href: '/', text: 'home' }} items={breadcrumbs} />
    <slot />
  </div>
</div>
