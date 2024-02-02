import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/api";

export interface ContentDataType {
  postId: number;
  keyword: string;
  visible: boolean;
  imageUrl: string;
  commentCount: number;
  postCreatedDate: string;
  postCreatedTime: string;
}

export interface GetPostType {
  totalPages: number;
  totalElements: number;
  size: number;
  content: ContentDataType[] | [];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
const PAGE_SIZE = 10; // temp page size

export const useApiGetReadPosts = (userId: number) => {
  // archive post
  const getReadPosts = async ({ pageParam }: { pageParam: number }) => {
    return api
      .get(
        `/praise-up/api/v1/posts?userId=${userId}&isRead=true&page=${pageParam}&size=${PAGE_SIZE}`,
      ) // read post (archive)
      .then((res) => res.data as GetPostType);
  };

  return useInfiniteQuery({
    queryKey: ["archive-post"],
    queryFn: ({ pageParam }) => getReadPosts({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetPostType) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
    enabled: !!userId,
  });
};
