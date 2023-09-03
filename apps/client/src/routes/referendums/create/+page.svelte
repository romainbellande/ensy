<script lang="ts">
  import { createForm, getValue } from 'felte';
  import { schema } from './schema';
  import type { FormValues } from './schema';
  import { validator } from '@felte/validator-yup';
  import { reporter } from '@felte/reporter-svelte';
  import type { RadioItem } from 'ui';
  import { Input, Button, Radio } from 'ui';
  import { _ } from 'svelte-i18n';
  import { ReferendumAnswerKind, ReferendumParticipantsKind } from '@/lib/graphql/gql';

  const pageBaseTrans = 'pages.referendums:create';

  const { form, data } = createForm<FormValues>({
    async onSubmit(values) {
      console.log('values :>> ', values);
    },
    extend: [validator({ schema }), reporter]
  });

  $: answerKind = getValue($data, 'answerKind');

  const answerKindItems: RadioItem[] = Object.values(ReferendumAnswerKind)
    .map((item) => ({
      text: `${pageBaseTrans}.answerKind.${item}`,
      value: item
    }))
    .reverse();

  const participantsKindItems: RadioItem[] = Object.values(
    ReferendumParticipantsKind
  ).map((item) => ({
    text: `${pageBaseTrans}.participantsKind.${item}`,
    value: item,
  }));
</script>

<div class="space-y-4">
  <h3 class="capitalize-first text-xl">{$_('pages.referendums:create.title')}</h3>
  <form use:form class="space-y-4 flex card w-max bg-base-100 shadow p-4">
    <div class="flex space-x-4">
      <Input label="name" name="name" required />
      <Input label="question" name="question" required />
    </div>

    <Input type="textarea" label="description" name="description" />

    <div class="flex space-x-4">
      <Input type="datetime-local" label={`${pageBaseTrans}.startDate`} name="startDate" />
      <Input type="datetime-local" label={`${pageBaseTrans}.endDate`}  name="endDate" required />
    </div>
    <div class="flex justify-between space-x-4">
      <div class="space-y-4">
        <h4 class="capitalize-first">{$_(`${pageBaseTrans}.answerKind.label`)}</h4>
        <Radio name="answerKind" items={answerKindItems} />
        {#if answerKind === ReferendumAnswerKind.Multiple}
          <Button type="button" outline>{$_(`${pageBaseTrans}.answerKind.addAQuestion`)}</Button>
        {/if}
      </div>
      <div class="space-y-4">
        <h4 class="capitalize-first">{$_(`${pageBaseTrans}.participantsKind.label`)}</h4>
        <Radio name="participantsKind" items={participantsKindItems} />
      </div>
    </div>
    <Button>{$_('common.save')}</Button>
  </form>
</div>
