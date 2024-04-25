import { lazy } from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';
const LayoutComponents = lazy(() => import('@/render/layout'));

const OrderList = lazy(() => import('@/pages/OrderList'));
const SellsList = lazy(() => import('@/pages/SellList'));
const Dashboard = lazy(() => import('@/pages/DashBoard'));
const RtkCom = lazy(() => import('@/pages/Rtk/RtxCom'))
const routers = createHashRouter([
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
      },
      {
        path:'/rtk',
        element:<RtkCom />
      }
    ]
  },
]);
export default routers;
