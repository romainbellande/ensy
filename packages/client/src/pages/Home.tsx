import { FC } from 'react';
import { GroupForm, GroupFormValues } from '@client/components';

const Home: FC = () => {
  const onSubmit = (values: GroupFormValues) => {
    console.log('values :>> ', values);
  };
  return (
    <div>
      <GroupForm onSubmit={onSubmit} />
    </div>
  );
};

export default Home;
