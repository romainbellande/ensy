<script lang="ts">
  import { Progress, Radio, type RadioItem } from 'ui/components';
  import type { PageData } from './$types';
  import dayjs from 'dayjs';
  import { _ } from 'svelte-i18n';
  import { Button, Icon } from 'ui';
  import { client } from '@/lib/graphql';
  import { createForm, getValue } from 'felte';
  import { schema, type FormValues } from './schema';
  import { validator } from '@felte/validator-yup';
  import { reporter } from '@felte/reporter-svelte';
  export let data: PageData;
  import { currentUser } from '@/lib/stores';

  interface ShowModalFn {
    showModal(): void;
  }

  const pageBaseTrans = 'pages.referendums:id';

  const getRemainingTimePercent = () => {
    const { startDate, endDate } = data.referendum;
    if (!startDate) {
      return 0;
    }

    const startTime = new Date(startDate).getTime();
    const currentTime = Date.now() - startTime;
    const endTime = new Date(endDate).getTime() - startTime;
    return Math.round((currentTime * 100) / endTime);
  };

  const fromDateToDisplayDate = () => {
    const { startDate, endDate } = data.referendum;

    if (!startDate) {
      return null;
    }
    return dayjs(startDate).to(endDate, true);
  };

  const remainingTimePercent = getRemainingTimePercent();
  const remainingTimeDisplay = fromDateToDisplayDate();
  const yesNoItems: RadioItem[] = [
    {
      text: `${pageBaseTrans}.yes`,
      value: true
    },
    {
      text: `${pageBaseTrans}.no`,
      value: false
    }
  ];

  const answers: RadioItem[] = data.referendum.answers.map((answer) => ({
    text: answer,
    value: answer
  }));

  const {
    form,
    data: formData,
    validate
  } = createForm<FormValues>({
    initialValues: {
      answer: '',
      agree: false
    },
    extend: [validator({ schema, castValues: true }), reporter]
  });

  const showConfirm = async (): Promise<void> => {
    await validate();
    const confirmVoteEl = document.getElementById('confirm-vote') as unknown as ShowModalFn;
    confirmVoteEl.showModal();
  };

  const submitVote = async () => {
    const answer = getValue($formData, 'answer');
    const agree = getValue($formData, 'agree');

    await client.CreateOneReferendumVote({
      createOneReferendumVoteInput2: {
        referendumVote: {
          referendumId: data.referendum.id,
          userId: $currentUser.id,
          agree,
          answer
        }
      }
    });
  };

  $: hasVoted = Boolean(
    data.referendum.votes.find((vote) => vote.user.externalId === $currentUser.externalId)
  );
</script>

<div class="space-y-8 max-w-max">
  <h2 class="text-lg capitalize-first space-x-4">
    <span class="font-semibold">{data.referendum.name}:</span><span>{data.referendum.question}</span
    >
  </h2>
  <div class="card p-4 max-w-max shadow space-y-4">
    <div class="flex space-x-4">
      <span>{$_(`${pageBaseTrans}.participation`)}</span>
      <Progress value={50} max={100} variant="progress-warning" info={`50%`} />
    </div>

    <div class="flex space-x-4">
      <span>{$_(`${pageBaseTrans}.remainingTime`)}</span>
      <Progress
        value={remainingTimePercent}
        max={100}
        variant="progress-warning"
        info={remainingTimeDisplay || ''}
      />
    </div>
  </div>
  {#if data.referendum.description}
    <p>{data.referendum.description}</p>
  {/if}
  <form class="flex justify-between space-x-4 items-end" use:form>
    {#if data.referendum.answers.length === 0}
      <Radio class="max-w-max" name="agree" items={yesNoItems} />
    {:else}
      <Radio class="max-w-max" name="answer" items={answers} />
    {/if}
    <Button on:click={showConfirm}>
      <span>{$_(`${pageBaseTrans}.vote`)}</span>
      <Icon name="mail" />
    </Button>
  </form>
</div>

<dialog id="confirm-vote" class="modal">
  <div class="modal-box space-y-8">
    <Icon class="m-auto" name="mail" height={48} width={48} />
    <h3 class="font-bold text-lg capitalize-first text-center">
      {$_(`${pageBaseTrans}.voteConfirmation`)}
    </h3>
    <div class="modal-action">
      <form method="dialog" class="flex space-x-4 justify-center items-center w-full">
        <!-- if there is a button in form, it will close the modal -->
        <Button type="modal" variant="btn-neutral">{$_('common.cancel')}</Button>
        <Button type="modal" on:click={submitVote}>{$_('common.submit')}</Button>
      </form>
    </div>
  </div>
</dialog>
