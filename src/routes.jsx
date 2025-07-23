import { createBrowserRouter } from 'react-router';
import { Outlet, Navigate } from 'react-router';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Create from './pages/Create.jsx';
import List from './pages/List.jsx';
import Detail from './pages/Detail.jsx';
import Finished from './pages/Finished.jsx';

const routes = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true, // 기본 경로 '/'에서 home으로 자동 리다이렉트
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'create',
        element: <Create />,
      },
      {
        path: 'list',
        element: <List />,
      },
      {
        path: 'detail/:id',
        element: <Detail />,
      },
      {
        path: 'finished/:id',
        element: <Finished />,
      },
    ],
  },
]);

export default routes;
