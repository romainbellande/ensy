<script lang="ts">
  import { reporter } from '@felte/reporter-svelte';
  import { validator } from '@felte/validator-yup';
  import { createForm, getValue } from 'felte';
  import slugify from 'slugify';
  import { _ } from 'svelte-i18n';
  import type { RadioItem, SelectOption } from 'ui';
  import { Button, Input, Radio, Select } from 'ui';
  import Icon from 'ui/components/Icon/Icon.svelte';
  import Textarea from 'ui/components/Textarea/Textarea.svelte';

  import { client } from '@/lib/graphql';
  import { ReferendumAnswerKind, ReferendumParticipantsKind } from '@/lib/graphql/gql';

  import { formatter } from './formatter';
  import type { FormValues } from './schema';
  import { schema } from './schema';

  const pageBaseTrans = 'pages.referendums:create';

  const { form, data, addField, unsetField, errors, setFields } = createForm<FormValues>({
    onSubmit(values) {
      const input = formatter(values);
      // TODO: handle error
      return client.CreateOneReferendum({ input });
    },
    initialValues: {
      answers: [],
      participantsExternalIds: [],
      participantsRoles: [],
      participantsKind: ReferendumParticipantsKind.All,
      answerKind: ReferendumAnswerKind.YesNo
    },
    extend: [validator({ schema }), reporter]
  });

  $: answerKind = getValue($data, 'answerKind');
  $: answers = getValue($data, 'answers');
  $: participantsKind = getValue($data, 'participantsKind');
  $: participantsRoles = getValue($data, 'participantsRoles');
  $: participantsExternalIds = getValue($data, 'participantsExternalIds');
  $: selectedRole = getValue($data, 'selectedRole');
  $: {
    const name = getValue($data, 'name');
    setFields('slug', slugify(name || '', { lower: true, trim: true }));
  }

  const rolesOptions: SelectOption[] = [
    {
      text: 'common.roles.member',
      value: 'member'
    },
    {
      text: 'common.roles.admin',
      value: 'admin'
    },
    {
      text: 'common.roles.super_admin',
      value: 'super_admin'
    }
  ];

  const answerKindItems: RadioItem[] = Object.values(ReferendumAnswerKind)
    .map((item) => ({
      text: `${pageBaseTrans}.answerKind.${item}`,
      value: item
    }))
    .reverse();

  const participantsKindItems: RadioItem[] = Object.values(ReferendumParticipantsKind).map(
    (item) => ({
      text: `${pageBaseTrans}.participantsKind.${item}`,
      value: item
    })
  );

  const addAnswer = () => addField(`answers`, { value: '' }, $data.answers.length);
  const removeAnswer = (index: number) => unsetField(`answers.${index}`);

  const addParticipantsExternalId = () =>
    addField(`participantsExternalIds`, { value: '' }, $data.participantsExternalIds.length);
  const removeParticipantsExternalId = (index: number) =>
    unsetField(`participantsExternalIds.${index}`);

  const addParticipantsRoles = () => {
    if (!participantsRoles.find(({ value }) => value === selectedRole)) {
      addField(`participantsRoles`, { value: selectedRole }, $data.participantsRoles.length);
    }
  };
  const removeParticipantsRoles = (index: number) => unsetField(`participantsRoles.${index}`);
  const submitting = () => {
    console.log('form :>> ', $errors);
  };
</script>

<div class="space-y-4">
  <h3 class="capitalize-first text-xl">{$_('pages.referendums:create.title')}</h3>
  <form use:form class="space-y-4 flex card max-w-screen-md bg-base-100 shadow p-4">
    <div class="flex space-x-4">
      <Input label="name" name="name" required />
      <Input label="slug" name="slug" required disabled />
    </div>
    <Input label="question" name="question" required />

    <Textarea label="description" name="description" />

    <div class="flex space-x-4">
      <Input type="datetime-local" label={`${pageBaseTrans}.startDate`} name="startDate" />
      <Input type="datetime-local" label={`${pageBaseTrans}.endDate`} name="endDate" required />
    </div>
    <div class="flex justify-between space-x-4">
      <div class="space-y-4">
        <h4 class="capitalize-first">{$_(`${pageBaseTrans}.answerKind.label`)}</h4>
        <Radio name="answerKind" items={answerKindItems} />
        <div class="flex flex-col space-y-4">
          {#each answers as _answer, index}
            <div class="flex items-center space-x-4">
              <Input name={`answers.${index}.value`} />
              <Button variant="btn-ghost" on:click={() => removeAnswer(index)}
                ><Icon class="text-error" name="trash" /></Button
              >
            </div>
          {/each}
        </div>
        {#if answerKind === ReferendumAnswerKind.Multiple}
          <Button outline on:click={addAnswer}
            >{$_(`${pageBaseTrans}.answerKind.addAnAnswer`)}</Button
          >
        {/if}
      </div>
      <div class="space-y-4">
        <h4 class="capitalize-first">{$_(`${pageBaseTrans}.participantsKind.label`)}</h4>
        <Radio name="participantsKind" items={participantsKindItems} />
        <div class="flex flex-col space-y-4">
          {#each participantsExternalIds as _participantsExternalId, index}
            <div class="flex items-center space-x-4">
              <Input name={`participantsExternalIds.${index}.value`} />
              <Button variant="btn-ghost" on:click={() => removeParticipantsExternalId(index)}
                ><Icon class="text-error" name="trash" /></Button
              >
            </div>
          {/each}
        </div>
        {#if participantsKind === ReferendumParticipantsKind.ByEmail}
          <Button outline on:click={addParticipantsExternalId}
            >{$_(`${pageBaseTrans}.participantsKind.addAnEmail`)}</Button
          >
        {/if}
        {#if participantsKind === ReferendumParticipantsKind.ByRole}
          <div class="flex space-x-4">
            <Select name="selectedRole" options={rolesOptions} />
            <Button outline on:click={addParticipantsRoles}
              >{$_(`${pageBaseTrans}.participantsRoles.add`)}</Button
            >
          </div>
          {#each participantsRoles as participantsRole, index}
            <div class="flex space-x-4 items-center justify-between">
              <p>{$_(participantsRole.value)}</p>
              <Button variant="btn-ghost" on:click={() => removeParticipantsRoles(index)}
                ><Icon class="text-error" name="trash" /></Button
              >
            </div>
          {/each}
        {/if}
      </div>
    </div>
    <Button type="submit" on:click={submitting}>{$_('common.save')}</Button>
  </form>
</div>
