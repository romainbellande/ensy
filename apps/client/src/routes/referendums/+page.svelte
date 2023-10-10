<script lang="ts">
  import dayjs from 'dayjs';
  import { Button, Icon, Link } from 'ui';

  import { getMaxVotes, type Referendum } from '@/lib/referendum';

  import type { PageData } from './$types';

  export let data: PageData;

  let getStatus = (referendum: Referendum) => {
    return referendum.endDate < new Date() &&
      (!referendum.startDate || referendum.startDate > new Date())
      ? 'closed'
      : 'open';
  };
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
          <th>result</th>
          <th>votes</th>
          <th>status</th>
          <th>start date</th>
          <th>end date</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        {#each data.referendums as referendum}
          <tr>
            <td>{referendum.question}</td>
            <td>{referendum.finalVote || 'N/A'}</td>
            <td>{referendum.votes.length} / {getMaxVotes(referendum, data.nbUsers)}</td>
            <td>{getStatus(referendum)}</td>
            <td>{dayjs(referendum.startDate).format('lll')}</td>
            <td>{dayjs(referendum.endDate).format('lll')}</td>
            <td class="flex space-x-4 items-center">
              <Link href={`/referendums/${referendum.id}`}>
                <Icon class="text-primary" name="eye" />
              </Link>
              <Link href={`/referendums/${referendum.id}/edit`}>
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
