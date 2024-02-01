import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";

export interface ContentDataType {
  postId: number;
  date: string;
  keyword: string;
  imageUrl: string;
  commentCount: number;
  postCreatedDate: string;
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
    enabled: !!userId,
  });
};
