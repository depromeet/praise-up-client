import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Archive } from "@/app/archive";
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
      {
        path: "/archive",
        element: <Archive />,
      },
    ],
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
