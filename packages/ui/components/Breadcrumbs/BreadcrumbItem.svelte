<script lang="ts">
  export let href: string;
</script>
<li>
  <a {href}>
    <slot />
  </a>
</li>
