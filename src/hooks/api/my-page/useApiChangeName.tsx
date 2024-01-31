import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

export const useApiChangeName = (userId: number) => {
  const changeNickName = async (name: string) => {
    const res = await api.patch(
      `/praise-up/api/v1/user/${userId}/nickname?nickname=${name}`,
    );
    return res;
  };

  return useMutation({
    mutationFn: (name: string) => changeNickName(name),
  });
};
