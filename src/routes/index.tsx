import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CommentMainPage } from "@/app/add-comment";
import { CommentFormPage } from "@/app/add-comment/comment-form";
import { CommentUpPage } from "@/app/add-comment/comment-up";
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
        element: <CommentMainPage />,
      },
      {
        path: "clap/write",
        element: <CommentFormPage />,
      },
      {
        path: "clap/up",
        element: <CommentUpPage />,
      },
    ],
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
