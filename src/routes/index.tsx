import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "@/app/home";
import { KakaoAuth } from "@/app/login/Kakao/KakaoAuth";
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
        path: "/auth",
        element: <KakaoAuth />,
      },
    ],
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
