import * as ReactDOM from "react-dom/client";
import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import routers from '@/render/router';
import { Spin } from 'antd'
import './index.css'
ReactDOM.createRoot(document.getElementById("app")).render(
    <Suspense fallback={<Spin fullscreen></Spin>}>
      <ConfigProvider locale={zhCN}>
        <RouterProvider router={routers} />
      </ConfigProvider>
    </Suspense>
);
