import { cn } from '@client/lib/utils';
import { FC } from 'react';
import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <nav
      className={cn(
        'flex w-screen shadow-sm h-24 bg-white px-4 items-center fixed',
        styles.root
      )}
    >
      <div className="font-semibold text-3xl">Ensy</div>
    </nav>
  );
};
