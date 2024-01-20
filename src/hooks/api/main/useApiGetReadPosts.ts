import { useInfiniteQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { api } from "@/api";

export interface ContentDataType {
  postId: number;
  date: string;
  keyword: string;
  imageUrl: string;
  commentCount: number;
  postCreatedDate: string;
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
const PAGE_SIZE = 4; // temp page size

// archive post
const getReadPosts = async ({ pageParam }: { pageParam: number }) => {
  const USER_ID = Cookies.get("k-u-id");

  return api
    .get(
      `/praise-up/api/v1/posts?userId=${USER_ID}&isRead=true&page=${pageParam}&size=${PAGE_SIZE}`,
    ) // read post (archive)
    .then((res) => res.data as GetPostType);
};

export const useApiGetReadPosts = () =>
  useInfiniteQuery({
    queryKey: ["archive-post"],
    queryFn: ({ pageParam }) => getReadPosts({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetPostType) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
  });
