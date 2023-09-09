import type { PageLoad } from './$types';
import { client } from '@/lib/graphql';

export const load: PageLoad = async ({ params }) => {
  const { referendum } = await client.GetReferendumById({ referendumId: params.id });
  return {
    referendum
  };
};
