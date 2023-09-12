import { client } from '@/lib/graphql';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const { referendum } = await client.GetReferendumById({ referendumId: params.id });
  return {
    referendum
  };
};
