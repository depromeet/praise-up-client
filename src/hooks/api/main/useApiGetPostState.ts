import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";

type TPostState = {
  isCreatable: boolean;
};

export const useApiGetPostState = (userId: number) => {
  const getPostState = async () => {
    return await api
      .get(`/praise-up/api/v1/user/${userId}/post-state`)
      .then((res) => res.data as TPostState)
      .then((state) => state.isCreatable);
  };

  return useQuery({
    queryKey: ["postState"],
    queryFn: getPostState,
  });
};
