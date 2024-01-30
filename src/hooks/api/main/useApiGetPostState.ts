import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { api } from "@/api";

type TPostState = {
  isCreatable: boolean;
};

export const useApiGetPostState = () => {
  const userId = Cookies.get("k-u-id");

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
