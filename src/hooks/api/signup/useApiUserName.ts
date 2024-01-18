import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";

export const useApiUserProfile = () => {
  const naviagate = useNavigate();

  const changeNickName = async (nickname: string) => {
    const USER_ID = Cookies.get("k-u-id");
    if (!USER_ID) return naviagate("/error");
    const res = await api.patch(
      `/praise-up/api/v1/user/${USER_ID}/nickname?nickname=${nickname}`,
    );
    return res;
  };

  return useMutation({
    mutationFn: (nickname: string) => changeNickName(nickname),
    onSuccess: () => naviagate("/main"),
    onError: () => naviagate("/error"),
  });
};
