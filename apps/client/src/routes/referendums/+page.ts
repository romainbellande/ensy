import { client } from '@/lib/graphql/client';

import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const data = await client.FindReferendums();

  return {
    referendums: data.referendums.edges.map((edge) => edge.node)
  };
};
