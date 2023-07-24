import { RouteObject } from "react-router-dom";
import Index from ".";
import { router as protectListRouter } from "./protectList/router";

export const router: RouteObject[] = [
  {
    path: "protect",
    element: <Index />,
    children: [...protectListRouter],
  },
];
