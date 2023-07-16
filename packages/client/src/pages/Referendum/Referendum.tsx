import {
  ReferendumList,
  FindReferendumNode,
} from '@client/components/Referendum';
import { FC, useMemo } from 'react';
import { useFindReferendumsQuery } from '@client/gql/generated';

export const Referendum: FC = () => {
  const { data } = useFindReferendumsQuery();
  const referendums = useMemo<FindReferendumNode[]>(() => {
    if (data?.referendums) {
      return data?.referendums.edges.map((edge) => edge.node);
    } else {
      return [];
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center flex-grow">
      <ReferendumList data={referendums} />
    </div>
  );
};
