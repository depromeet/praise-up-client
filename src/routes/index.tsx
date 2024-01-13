import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "@/app/error/404";
import { CommentMainPage } from "@/app/add-comment";
import { CommentDonePage } from "@/app/add-comment/comment-done";
import { CommentFormPage } from "@/app/add-comment/comment-form";
import { CommentUpPage } from "@/app/add-comment/comment-up";
import { Archive } from "@/app/archive";
import { Home } from "@/app/home";
import { Post } from "@/app/post";
import { Done } from "@/app/post/done";
import { KeyWord } from "@/app/post/keyword";
import { UnpublishedPostPage } from "@/app/unpublished-post";
import { GlobalLayout } from "@/components/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
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
        path: "/post/keyword",
        element: <KeyWord />,
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
      {
        path: "clap/done",
        element: <CommentDonePage />,
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
