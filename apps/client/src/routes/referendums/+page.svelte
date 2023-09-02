<script lang="ts">
  import { Icon } from 'ui';
  let handleClick = () => {
    console.log('clicked');
  };
</script>

<div>
  <h3 class="flex items-center space-x-4">
    <span class="capitalize-first font-bold text-lg">referendums</span><Icon
      name="plus-circle"
      on:click={handleClick}
    />
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
          <th>end date</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr>
          <td>do we must accept pension reform ?</td>
          <td>no</td>
          <td>closed</td>
          <td>12/08/23 12:23</td>
          <td>16/08/23 12:23</td>
          <td>test</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
