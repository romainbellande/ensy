import {
  ReferendumList,
  FindReferendumNode,
} from '@client/components/Referendum';
import { FC, useMemo } from 'react';
import { useFindReferendumsQuery } from '@client/gql/generated';
import { ReferendumForm } from '@client/components/Referendum/ReferendumForm/ReferendumForm';

const Referendums: FC = () => {
  const { data } = useFindReferendumsQuery();

  const referendums = useMemo<FindReferendumNode[]>(() => {
    if (data?.referendums) {
      return data?.referendums.edges.map((edge) => edge.node);
    } else {
      return [];
    }
  }, [data]);

  return (
    <div className="flex-grow">
      {referendums.length > 0 ? (
        <ReferendumList data={referendums} />
      ) : (
        <ReferendumForm />
      )}
    </div>
  );
};

export default Referendums;
