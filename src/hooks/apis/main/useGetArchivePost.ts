import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/api";

export interface ContentDataType {
  date: string;
  keyword: string;
  commentCount: number;
}

export interface GetArchivePostType {
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

export const getArchivePost = ({ pageParam }: { pageParam: number }) =>
  api
    .get(`/posts?page=${pageParam}&size=${PAGE_SIZE}`)
    .then((res) => res.data as GetArchivePostType);

export const useGetArchivePost = () => {
  return useInfiniteQuery({
    queryKey: ["archive-post"],
    queryFn: ({ pageParam }) => getArchivePost({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetArchivePostType) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
  });
};
