<script lang="ts">
  export let href: string;
  import type { FeatherIconNames } from 'feather-icons';

  import { Icon } from '../Icon';

  export let icon: FeatherIconNames;
</script>

<li class="group">
  <a {href} class="group-hover:text-primary group-hover:cursor-pointer flex space-x-4 items-center">
    <Icon name={icon} height={16} width={16} />
    <span><slot /></span>
  </a>
</li>
