import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { TMarbleCard } from "@/types/archive";

const CACHE_KEY = "marble_card";

export const useApiMarbleCard = (postId: number) => {
  const fetchMarbleCard = async (): Promise<TMarbleCard> => {
    const res = await api.get(`/praise-up/api/v1/posts/${postId}`);
    return res.data as TMarbleCard;
  };

  return useQuery({
    queryKey: [CACHE_KEY, postId],
    queryFn: fetchMarbleCard,
  });
};
