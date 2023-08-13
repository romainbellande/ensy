import { cn } from '@client/lib/utils';
import { ChevronRight, Home } from 'lucide-react';
import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface BreadCrumbItem {
  text: string;
  to: string;
}

interface Props {
  className?: string;
  items: BreadCrumbItem[];
}

export const BreadCrumb: FC<Props> = ({ items, className }) => {
  const { t } = useTranslation();

  return (
    <div className={cn('flex space-x-2 items-center', className)}>
      <Home size={16} />
      {items.map(({ text, to }) => (
        <Fragment key={text}>
          <ChevronRight size={16} />
          <Link key={text} to={to}>
            {t(text)}
          </Link>
        </Fragment>
      ))}
    </div>
  );
};
