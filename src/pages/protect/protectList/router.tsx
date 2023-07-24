import { RouteObject } from "react-router-dom";
import Index from ".";
import List, { loader } from "./list";
import Detail from "./detail";
import Write from "./write";
import Edit from "./edit";

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
      // {
      //   path: "write",
      //   element: <Write />,
      // },
      // {
      //   path: ":uuid/edit",
      //   element: <Edit />,
      // },
    ],
  },
];
