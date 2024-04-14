import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
const LayoutComponents = lazy(() => import('@/render/layout'));

const OrderList = lazy(() => import('@/pages/OrderList'));
const SellsList = lazy(() => import('@/pages/SellList'));
const Dashboard = lazy(() => import('@/pages/DashBoard'));
const routers = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/home' />,
  },
  {
    path: '/',
    element: <LayoutComponents />,
    children:[
      {
        path:'/home',
        element:<Dashboard />
      },
      {
        path:'/order',
        element:<OrderList />
      },
      {
        path:'/sells',
        element:<SellsList />
      }
    ]
  },
]);
export default routers;
