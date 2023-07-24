import { RouteObject } from "react-router-dom";
import Index from ".";
import Detail from "./detail";
import List, { loader } from "./list";

export const router: RouteObject[] = [
  {
    path: "list",
    element: <Index />,
    children: [
      {
        path: "",
        element: <List />,
        loader: loader,
      },
      {
        path: ":desertionNo",
        element: <Detail />,
      },
    ],
  },
];
