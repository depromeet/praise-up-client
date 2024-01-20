import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";

export interface GetOnePostType {
  postId: number;
  userNickname: string;
  content: string;
  imageUrl: string;
  keyword: string;
  visible: boolean;
  isRead: boolean;
  postCreatedDate: string;
}

const getOnePost = (postId?: string) =>
  api
    .get(`/praise-up/api/v1/posts/${postId}`)
    .then((res) => res.data as GetOnePostType);

export const useApiGetOnePost = (postId?: string) => {
  return useQuery<GetOnePostType>({
    queryKey: ["post"],
    queryFn: () => getOnePost(postId),
    initialData: {
      postId: -1,
      userNickname: "",
      content: "",
      imageUrl: "",
      keyword: "",
      visible: false,
      isRead: false,
      postCreatedDate: new Date().toString(),
    },
  });
};
