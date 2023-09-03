<script lang="ts">
  import { createForm } from 'felte';
  import { schema } from './schema';
  import type { FormValues } from './schema';
  import { validator } from '@felte/validator-yup';
  import { Input } from 'ui';
  import { _ } from 'svelte-i18n';

  const { form } = createForm({
    async onSubmit(values: FormValues) {
      console.log('values :>> ', values);
    },
    extend: validator({ schema })
  });
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
      <Input type="datetime-local" label="startDate" name="startDate" />
      <Input type="datetime-local" label="endDate" name="endDate" required />
    </div>
  </form>
</div>
