import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "@/app/home";
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
    ],
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
