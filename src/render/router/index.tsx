import { lazy } from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';
const LayoutComponents = lazy(() => import('@/render/layout'));

const OrderList = lazy(() => import('@/pages/OrderList'));
const SellsList = lazy(() => import('@/pages/SellList'));
const Dashboard = lazy(() => import('@/pages/DashBoard'));
const RtkCom = lazy(() => import('@/pages/Rtk/RtxCom'))
const WindowCom = lazy(() => import('@/pages/window'))
const Alioss = lazy(() => import('@/pages/allioss'))
export const MainRoute = {
    path: '/',
    title:'首页',
    element: <LayoutComponents />,
    children:[
      {
        path:'/home',
        title:'首页',
        element:<Dashboard />
      },
      {
        path:'/order',
        title:'库存列表',
        element:<OrderList />
      },
      {
        path:'/sells',
        title:'出库列表',
        element:<SellsList />
      },
      {
        path:'/rtk',
        title:'redux-tools',
        element:<RtkCom />
      },
      {
        path:'/win',
        title:'创建窗口',
        element:<WindowCom />
      },
      {
        path:'/aloss',
        title:'阿里云oss',
        element:<Alioss />
      }
    ]
  }
const routers = createHashRouter([
  {
    path: '/',
    element: <Navigate to='/home' />,
  },
  MainRoute
]);
export default routers;
