import { PropsWithChildren, Suspense } from 'react';
import { InitialLoader } from '../InitialLoader';

const LazyLoadingWrap = ({ children }: PropsWithChildren) => {
  return <Suspense fallback={<InitialLoader type="fullScreen" />}>{children}</Suspense>;
};

export default LazyLoadingWrap;
