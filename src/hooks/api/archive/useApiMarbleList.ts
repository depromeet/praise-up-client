import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { TMarbleListPayload, TMarbleListRes } from "@/types/archive";

// type TMarbleData = {
//   pageParams: TMarbleListPayload;
//   pages: TMarbleListRes[];
// };

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
    queryKey: ["marble_list", postId],
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
