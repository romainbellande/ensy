import { FC, PropsWithChildren, Suspense } from 'react';

const ThemedSuspenseFallback = () => {
  return (
    <div className="p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
      Loading...
    </div>
  );
};

export const ThemedSuspense: FC<PropsWithChildren> = ({ children }) => (
  <Suspense fallback={<ThemedSuspenseFallback />}>{children}</Suspense>
);
