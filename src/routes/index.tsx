import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AddCommentPage } from "@/app/add-comment";
import { WriteCommentPage } from "@/app/add-comment/write";
import { Home } from "@/app/home";
import { Post } from "@/app/post";
import { Done } from "@/app/post/done";
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
        path: "/post/write",
        element: <Post />,
      },
      {
        path: "/post/done",
        element: <Done />,
      },
      {
        path: "seal/:id",
        element: <UnpublishedPostPage />,
      },
      {
        path: "clap",
        element: <AddCommentPage />,
      },
      {
        path: "clap/write",
        element: <WriteCommentPage />,
      },
    ],
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
