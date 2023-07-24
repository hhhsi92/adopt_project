import { RouteObject } from "react-router-dom";
import Index from ".";
import { router as listRouter } from "./list/router";

export const router: RouteObject[] = [
  {
    path: "shelter",
    element: <Index />,
    children: [
      ...listRouter,
    ],
  },
];
