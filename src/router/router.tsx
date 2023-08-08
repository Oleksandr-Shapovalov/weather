import { ComponentType, LazyExoticComponent, lazy } from 'react';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { LazyLoadingWrap } from '@/core/components';
import { Layout } from '@/core/layouts/Layout';
import { RoutePath } from './routePath';

type Page = LazyExoticComponent<ComponentType>;

// core

const NotFoundPage: Page = lazy(() =>
  import('@/core/pages').then((module) => ({ default: module.NotFoundPage }))
);
const ErrorPage: Page = lazy(() =>
  import('@/core/pages').then((module) => ({ default: module.ErrorPage }))
);

// weaather

const CurrentWeatherPage: Page = lazy(() =>
  import('@/modules/weather/pages').then((module) => ({ default: module.CurrentWeatherPage }))
);

const commonRoutes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '*',
        element: (
          <LazyLoadingWrap>
            <NotFoundPage />
          </LazyLoadingWrap>
        ),
      },
      {
        path: RoutePath.CurrentWeather,
        element: (
          <LazyLoadingWrap>
            <CurrentWeatherPage />
          </LazyLoadingWrap>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter([
  {
    errorElement: (
      <LazyLoadingWrap>
        <ErrorPage />
      </LazyLoadingWrap>
    ),
    children: [...commonRoutes],
  },
]);
