import { useSuspenseQuery } from "@tanstack/react-query";
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

// unread post
const getUnreadPosts = async () => {
  const USER_ID = Cookies.get("k-u-id");
  return api
    .get<ContentDataType[]>(
      `/praise-up/api/v1/posts?userId=${USER_ID}&isRead=false`,
    )
    .then((res) => res.data);
};

export const useApiGetUnreadPosts = () =>
  useSuspenseQuery({
    queryKey: ["unread-post"],
    queryFn: getUnreadPosts,
  });
