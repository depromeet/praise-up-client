import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { TUserInfo } from "@/types/my-page";

const CACHE_KEY = "user_info";

export const useApiUserInfo = (id?: string) => {
  const fetchMarbleCard = async (): Promise<TUserInfo> => {
    const res = await api.get(`/praise-up/api/v1/user/${id}`);
    return res.data as TUserInfo;
  };

  return useQuery({
    queryKey: [CACHE_KEY, id],
    queryFn: fetchMarbleCard,
  });
};
