import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/MainLayout';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/intro" replace />, index: true },
        { path: '/intro', element: <IntroPage /> },
        { path: '/user/login', element: <LoginPage /> },
        { path: '/user/profile', element: <UserProfilePage /> },
        { path: '/blog/posts', element: <PostsPage />}
      ],
    },
    {
      path: '*',
      element: <MainLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Routes
const IntroPage = Loadable(lazy(() => import('../pages/Intro')));
const LoginPage = Loadable(lazy(() => import('../pages/user/Login')));
const UserProfilePage = Loadable(lazy(() => import('../pages/user/UserProfile')));
const PostsPage = Loadable(lazy(() => import('../pages/blog/Posts')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
