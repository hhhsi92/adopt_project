import { RouteObject } from "react-router-dom";
import Index from "..";
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
    ],
  },
];
