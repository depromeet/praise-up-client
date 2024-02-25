import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/api";

export type ClapCalendarResType = {
  postId: number;
  imageUrl: string;
  postCreatedDate: string; // raw data
  date?: string; // extract date from raw data
}[];

export const useApiClapCalendar = (userId: number) => {
  const getCalendar = async ({ pageParam }: { pageParam: number }) => {
    const target = new Date();
    target.setMonth(target.getMonth() + 1 - pageParam);
    return await api
      .get<ClapCalendarResType>(
        `/praise-up/api/v1/user/${userId}/posts?year=${target.getFullYear()}&month=${
          target.getMonth() === 0 ? 12 : target.getMonth()
        }`,
      )
      .then((res) => res.data);
  };

  return useInfiniteQuery({
    queryKey: ["user-calendar"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getCalendar({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => {
      return allPages.length;
    },
    select: (data) => {
      const extractDate = data.pages.map((page) =>
        page.map((data) => ({
          ...data,
          date: data.postCreatedDate.split("T")[0].split("-")[2], // 일자만 추출
        })),
      );
      return {
        pages: [...extractDate],
        pageParams: [...data.pageParams],
      };
    },
    enabled: !!userId,
  });
};
