import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { Archive } from "@/app/archive";
import { CommentMainPage } from "@/app/comment";
import { CommentFormPage } from "@/app/comment/comment-form";
import { CommentUpPage } from "@/app/comment/comment-up";
import { DetailPage } from "@/app/detail";
import { NotFound } from "@/app/error/404";
import { Home } from "@/app/home";
import { MyPage } from "@/app/mypage";
import { MyPageEdit } from "@/app/mypage/mypage-edit";
import { MyPageUnregister } from "@/app/mypage/unregister/unregister";
import { MyPageUnregisterConfirm } from "@/app/mypage/unregister/unregister-confirm";
import { MyPageUnregisterDone } from "@/app/mypage/unregister/unregister-done";
import { MyPageUnregisterInput } from "@/app/mypage/unregister/unregister-input";
import { OnBoarding } from "@/app/on-boarding";
import { SetNickName } from "@/app/on-boarding/set-nickname";
import { OnBoardingClap } from "@/app/on-boarding-clap";
import { Post } from "@/app/post";
import { Done } from "@/app/post/done";
import { KeyWord } from "@/app/post/keyword";
import { KakaoAuth } from "@/components/app/login/kakao/kakao-auth";
import { GlobalLayout } from "@/components/layout";
import { RequireLoginLayout } from "@/components/layout/login-layout";

type RouteChildren = {
  auth: boolean;
} & RouteObject;

const routeChildren: RouteChildren[] = [
  {
    path: "/",
    element: <OnBoarding />,
    auth: false,
  },
  {
    path: "/signup",
    element: <SetNickName />,
    auth: true,
  },
  {
    path: "/main",
    element: <Home />,
    auth: true,
  },
  {
    path: "/auth",
    element: <KakaoAuth />,
    auth: false,
  },
  {
    path: "/post/write",
    element: <Post />,
    auth: true,
  },
  {
    path: "/post/done",
    element: <Done />,
    auth: true,
  },
  {
    path: "/post/keyword",
    element: <KeyWord />,
    auth: true,
  },
  {
    path: "seal/:postId",
    element: <DetailPage />,
    auth: true,
  },

  {
    path: "/:path",
    element: <OnBoardingClap />,
    auth: false,
  },
  {
    path: "/clap",
    element: <CommentMainPage />,
    auth: false,
  },
  {
    path: "/clap/write",
    element: <CommentFormPage />,
    auth: false,
  },
  {
    path: "/clap/up",
    element: <CommentUpPage />,
    auth: false,
  },
  {
    path: "/archive",
    element: <Archive />,
    auth: true,
  },
  {
    path: "/mypage",
    element: <MyPage />,
    auth: true,
  },
  {
    path: "/mypage/edit",
    element: <MyPageEdit />,
    auth: true,
  },
  {
    path: "/mypage/unregister",
    element: <MyPageUnregister />,
    auth: true,
  },
  {
    path: "/mypage/unregister/input",
    element: <MyPageUnregisterInput />,
    auth: true,
  },
  {
    path: "/mypage/unregister/confirm",
    element: <MyPageUnregisterConfirm />,
    auth: true,
  },
  {
    path: "/mypage/unregister/done",
    element: <MyPageUnregisterDone />,
    auth: false,
  },
  {
    path: "*",
    element: <NotFound />,
    auth: false,
  },
];

const browserRouter = routeChildren.map(({ path, element, auth }) => {
  return {
    path,
    element: auth ? (
      <RequireLoginLayout>{element}</RequireLoginLayout>
    ) : (
      element
    ),
  };
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    errorElement: <NotFound />,
    children: browserRouter,
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
