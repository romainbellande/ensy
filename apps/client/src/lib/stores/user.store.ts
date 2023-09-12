import { writable } from 'svelte/store';
import type { GetMeQuery } from '../graphql/gql';

export const currentUser = writable<GetMeQuery['me']>();
