import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "@/app/home";
import { Post } from "@/app/post";
import { Done } from "@/app/post/done";
import { GlobalLayout } from "@/components/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/post/write",
        element: <Post />,
      },
      {
        path: "/post/done",
        element: <Done />,
      },
    ],
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
