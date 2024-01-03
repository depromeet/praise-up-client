import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "@/app/home";
import { UnpublishedPostPage } from "@/app/unpublished-post";
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
        path: "seal/:id",
        element: <UnpublishedPostPage />,
      },
    ],
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
