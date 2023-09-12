<script lang="ts">
  import dayjs from 'dayjs';
  import { Button, Icon, Link } from 'ui';

  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div>
  <h3 class="flex items-center space-x-4">
    <span class="capitalize-first text-lg">referendums</span>
    <a href="/referendums/create">
      <Icon class="text-primary" name="plus-circle" />
    </a>
  </h3>

  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th />
          <th>question</th>
          <th>vote</th>
          <th>status</th>
          <th>start date</th>
          <th>end date</th>asasda
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        {#each data.referendums as referendum}
          <tr>
            <td>{referendum.question}</td>
            <td>TODO: referendum vote result</td>
            <td>closed</td>
            <td>{dayjs(referendum.startDate).format('lll')}</td>
            <td>{dayjs(referendum.endDate).format('lll')}</td>
            <td class="flex space-x-4 items-center">
              <Link href={`/referendums/${referendum.id}`}>
                <Icon class="text-primary" name="eye" />
              </Link>
              <Link href={`/referendums/${referendum.id}`}>
                <Icon class="text-secondary" name="edit" />
              </Link>
              <Button variant="btn-ghost">
                <Icon class="text-error" name="trash" />
              </Button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
