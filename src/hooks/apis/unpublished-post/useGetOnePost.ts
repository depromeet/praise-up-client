import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "@/api";

export interface GetOnePostType {
  content: string;
  imageUrl: string;
  keyword: string;
  visible: boolean;
}

const getOnePost = (postId?: string) =>
  api.get(`/posts/${postId}`).then((res) => res.data as GetOnePostType);

export const useGetOnePost = (postId?: string) => {
  return useSuspenseQuery<GetOnePostType>({
    queryKey: ["post"],
    queryFn: () => getOnePost(postId),
  });
};
