import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";

export const useApiChangeName = () => {
  const nav = useNavigate();

  const changeNickName = async (name: string) => {
    const USER_ID = Cookies.get("k-u-id");
    if (!USER_ID) return nav("/error");

    const res = await api.patch(
      `/praise-up/api/v1/user/${USER_ID}/nickname?nickname=${name}`,
    );
    return res;
  };

  return useMutation({
    mutationFn: (name: string) => changeNickName(name),
  });
};
