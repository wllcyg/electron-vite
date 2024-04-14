import * as ReactDOM from "react-dom/client";
import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import routers from '@/render/router';
ReactDOM.createRoot(document.getElementById("app")).render(
    <Suspense>
      <RouterProvider router={routers} />
    </Suspense>
);
