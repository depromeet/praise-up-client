import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/api";

export interface ContentDataType {
  date: string;
  keyword: string;
  commentCount: number;
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

// unread post
const getUnreadPost = ({ pageParam }: { pageParam: number }) =>
  api
    .get(`posts?page=${pageParam}&size=2`) // unread post
    .then((res) => res.data as GetPostType);

// archive post
const getArchivePost = ({ pageParam }: { pageParam: number }) =>
  api
    .get(`/posts?page=${pageParam}&size=${PAGE_SIZE}`) // read post (archive)
    .then((res) => res.data as GetPostType);

export const useGetPost = ({ unread = false }: { unread?: boolean }) => {
  const unreadQuery = useInfiniteQuery({
    queryKey: ["unread-post"],
    queryFn: ({ pageParam }) => getUnreadPost({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetPostType) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
  });

  const archiveQuery = useInfiniteQuery({
    queryKey: ["archive-post"],
    queryFn: ({ pageParam }) => getArchivePost({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetPostType) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
  });
  return unread ? unreadQuery : archiveQuery;
};
