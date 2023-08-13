import { FC, PropsWithChildren } from 'react';
import { BreadCrumb, BreadCrumbItem } from '../BreadCrumb';
import { useLocation } from 'react-router-dom';

export const Page: FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();

  const paths = pathname.split('/').filter(Boolean);

  const breadcrumbItems: BreadCrumbItem[] = paths.map((path) => ({
    text: path,
    to: pathname.split(path)[0] + path,
  }));

  return (
    <div>
      <BreadCrumb className="pb-4" items={breadcrumbItems} />
      {children}
    </div>
  );
};
