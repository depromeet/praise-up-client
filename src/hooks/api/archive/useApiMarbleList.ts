import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { TMarbleListPayload, TMarbleListRes } from "@/types/archive";

const CACHE_KEY = "marble_list";

export const useApiMarbleList = (
  postId: number,
  marblePayload: TMarbleListPayload,
) => {
  const fetchMarbleList = async (
    pageParam: TMarbleListPayload,
  ): Promise<TMarbleListRes> => {
    const payloadString = Object.entries(pageParam)
      .filter((e) => e[1] !== null)
      .map((e) => e.join("="))
      .join("&");
    const res = await api.get(
      `/praise-up/api/v1/posts/${postId}/comments?${payloadString}`,
    );
    return res.data as TMarbleListRes;
  };

  return useInfiniteQuery<TMarbleListRes>({
    queryKey: [CACHE_KEY, postId, marblePayload.page],
    queryFn: ({ pageParam = marblePayload }) =>
      fetchMarbleList(pageParam as TMarbleListPayload),
    initialPageParam: { page: 0, size: 24 },
    getNextPageParam: (lastPage) => {
      lastPage.pageable.pageNumber < lastPage.totalPages
        ? {
            ...marblePayload,
            page: lastPage.pageable.pageNumber + 1,
          }
        : undefined;
    },
  });
};
