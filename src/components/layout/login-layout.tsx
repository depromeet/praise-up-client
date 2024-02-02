import { Fragment, ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ConfirmContext } from "@/components/common/confirm/confirm-context";
import { useAuthStore } from "@/store/auth";

type Props = {
  children: ReactNode;
};

export const RequireLoginLayout = ({ children }: Props) => {
  const { auth } = useAuthStore();
  const { confirm } = useContext(ConfirmContext);
  const nav = useNavigate();

  useEffect(() => {
    if (auth.isLogin) return;

    void redirectIndexPage();
  }, [auth]);

  const redirectIndexPage = async () => {
    await confirm({
      message: {
        title: "로그인을 해야 이용할 수 있어요.",
        description: "",
      },
      confirm: {
        text: "로그인하기",
      },
    });

    nav("/");
  };

  return <Fragment>{children}</Fragment>;
};
