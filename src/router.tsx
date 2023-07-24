import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Main from "./pages/main";

import { router as authRouter } from "./pages/auth/router";
import { router as noticeRouter } from "./pages/notice/router";
import { router as protectRouter } from "./pages/protect/router";
import { router as shelterRouter } from "./pages/shelter/router";

export const router = createBrowserRouter([
  {
    path: "/adopt_project",
    element: <App />,
    children: [
      {
        path: "/adopt_project",
        element: <Main />,
      },
      // 로그인
      ...authRouter,

      ...noticeRouter,

      ...protectRouter,

      ...shelterRouter
    ],
  },
]);
