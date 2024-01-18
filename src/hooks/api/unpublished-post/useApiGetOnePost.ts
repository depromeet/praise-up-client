import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";

export interface GetOnePostType {
  content: string;
  imageUrl: string;
  keyword: string;
  visible: boolean;
}

const getOnePost = (postId?: string) =>
  api.get(`/posts/${postId}`).then((res) => res.data as GetOnePostType);

export const useApiGetOnePost = (postId?: string) => {
  return useQuery<GetOnePostType>({
    queryKey: ["post"],
    queryFn: () => getOnePost(postId),
    initialData: {
      content: "",
      imageUrl: "",
      keyword: "",
      visible: false,
    },
  });
};
