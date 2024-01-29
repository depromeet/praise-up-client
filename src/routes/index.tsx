import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Archive } from "@/app/archive";
import { CommentMainPage } from "@/app/comment";
import { CommentFormPage } from "@/app/comment/comment-form";
import { CommentUpPage } from "@/app/comment/comment-up";
import { DetailPage } from "@/app/detail";
import { NotFound } from "@/app/error/404";
import { Home } from "@/app/home";
import { MyPage } from "@/app/mypage";
import { MyPageEdit } from "@/app/mypage/mypage-edit";
import { OnBoarding } from "@/app/on-boarding";
import { SetNickName } from "@/app/on-boarding/set-nickname";
import { OnBoardingClap } from "@/app/on-boarding-clap";
import { Post } from "@/app/post";
import { Done } from "@/app/post/done";
import { KeyWord } from "@/app/post/keyword";
import { KakaoAuth } from "@/components/app/login/kakao/kakao-auth";
import { GlobalLayout } from "@/components/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <OnBoarding />,
      },
      {
        path: "/signup",
        element: <SetNickName />,
      },
      {
        path: "/main",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <KakaoAuth />,
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
        path: "seal/:postId",
        element: <DetailPage />,
      },

      {
        path: "/:path",
        element: <OnBoardingClap />,
      },
      {
        path: "/clap",
        element: <CommentMainPage />,
      },
      {
        path: "/clap/write",
        element: <CommentFormPage />,
      },
      {
        path: "/clap/up",
        element: <CommentUpPage />,
      },
      {
        path: "/archive",
        element: <Archive />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/mypage/claps",
      },
      {
        path: "/mypage/edit",
        element: <MyPageEdit />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
