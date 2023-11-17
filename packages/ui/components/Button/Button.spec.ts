import '@testing-library/jest-dom'

import { render } from '@testing-library/svelte'

import Button from './Button.svelte'

test('can be a submit button', () => {
  const {getByTestId} = render(Button, {  type: 'submit' })

  const button = getByTestId('button');

  const type = button.attributes.getNamedItem('type')?.value;

  expect(type).toEqual('submit')
});
