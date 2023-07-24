import { RouteObject } from "react-router-dom";
import Index from ".";

import Login from "./login";
import LoginCheck, { action as LoginCheckAction } from "./loginCheck";

export const router: RouteObject[] = [
  {
    path: "auth",
    element: <Index />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "loginCheck",
        element: <LoginCheck />,
        action: LoginCheckAction,
      },
    ],
  },
];
