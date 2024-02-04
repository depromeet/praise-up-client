import { DehydratedState, useQuery } from "@tanstack/react-query";

import { api } from "@/api";

export interface ContentDataType {
  postId: number;
  keyword: string;
  imageUrl: string;
  visible: boolean;
  commentCount: number;
  postCreatedTime: string;
  postCreatedDate: string;
  openDateTime?: DehydratedState;
}

export const useApiGetUnreadPosts = (userId: number) => {
  const getUnreadPosts = async () => {
    return api
      .get<ContentDataType[]>(
        `/praise-up/api/v1/posts?userId=${userId}&isRead=false`,
      )
      .then((res) => res.data);
  };

  return useQuery({
    queryKey: ["unread-post"],
    queryFn: getUnreadPosts,
    select: (posts: ContentDataType[]) => {
      return posts.map((post) => {
        const [date, time] = post.postCreatedTime.split("T");
        const [year, month, day] = date.split("-");
        const [hour, minute, _] = time.split(":");

        const openDateTime = new Date(
          +year,
          +month - 1,
          +day,
          +hour,
          +minute + 30,
        );
        return { ...post, openDateTime };
      });
    },
    enabled: !!userId,
  });
};
