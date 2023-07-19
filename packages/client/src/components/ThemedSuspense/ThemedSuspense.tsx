import { FC, PropsWithChildren, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const ThemedSuspenseFallback = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 text-xl">
      <Loader2 size={48} className="animate-spin " />
    </div>
  );
};

export const ThemedSuspense: FC<PropsWithChildren> = ({ children }) => (
  <Suspense fallback={<ThemedSuspenseFallback />}>{children}</Suspense>
);
