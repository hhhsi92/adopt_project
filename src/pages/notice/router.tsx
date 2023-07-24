import { RouteObject } from "react-router-dom";
import Index from ".";
import { router as noticeRouter } from "./noticeList/router";

export const router: RouteObject[] = [
  {
    path: "notice",
    element: <Index />,
    children: [...noticeRouter],
  },
];
