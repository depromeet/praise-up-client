import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

type UnregisterUserParams = {
  userId: number;
  reason: string;
};

export const useApiUnregister = () => {
  const deleteUser = async ({ userId, reason }: UnregisterUserParams) => {
    const res = await api.delete(
      `/praise-up/api/v1/user/${userId}/nickname?reason=${reason}`,
    );
    return res;
  };

  return useMutation({
    mutationFn: (params: UnregisterUserParams) => deleteUser(params),
  });
};
