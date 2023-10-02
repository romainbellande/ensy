<script lang="ts">
  import SidenavItem from './SidenavItem.svelte';
</script>

<nav class="pt-24 w-72 h-screen fixed space-y-4 mt-4 px-4">
  <div class="card w-full bg-base-100 shadow px-8 py-4">
    <ul class="space-y-4">
      <SidenavItem href="/" icon="home">home</SidenavItem>
      <SidenavItem href="/referendums" icon="activity">referendums</SidenavItem>
    </ul>
  </div>
</nav>
