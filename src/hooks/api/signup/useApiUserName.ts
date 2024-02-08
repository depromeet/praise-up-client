import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";

export const useApiUserProfile = (userId: number) => {
  const navigate = useNavigate();

  const changeNickName = async (nickname: string) => {
    const res = await api.patch(
      `/praise-up/api/v1/user/${userId}/nickname?nickname=${nickname}`,
    );
    return res;
  };

  return useMutation({
    mutationFn: (nickname: string) => changeNickName(nickname),
    onSuccess: () => navigate("/post/keyword", { state: "openPostGuide" }),
    onError: () => navigate("/error"),
  });
};
