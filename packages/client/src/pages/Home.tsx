import { FC } from 'react';
import { GroupForm, GroupFormValues } from '@client/components';

const Home: FC = () => {
  const onSubmit = (values: GroupFormValues) => {
    console.log('values :>> ', values);
  };
  return (
    <div className="flex justify-center items-center flex-grow">
      <GroupForm onSubmit={onSubmit} />
    </div>
  );
};

export default Home;
