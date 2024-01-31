import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";

export const useApiChangeName = (userId: number) => {
  const nav = useNavigate();

  const changeNickName = async (name: string) => {
    if (!userId) return nav("/error");

    const res = await api.patch(
      `/praise-up/api/v1/user/${userId}/nickname?nickname=${name}`,
    );
    return res;
  };

  return useMutation({
    mutationFn: (name: string) => changeNickName(name),
  });
};
