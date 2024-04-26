import * as ReactDOM from "react-dom/client";
import React, { Suspense } from 'react';
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider,Spin } from 'antd';
import routers from '@/render/router';
import './index.css'
import store from '@/render/store';
ReactDOM.createRoot(document.getElementById("app")).render(
  <Provider store={store}>
      <Suspense fallback={<Spin fullscreen></Spin>}>
        <ConfigProvider locale={zhCN}>
          <RouterProvider router={routers} />
        </ConfigProvider>
      </Suspense>
  </Provider>
);
