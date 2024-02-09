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
  postCreatedTime: string;
  openDateTime?: Date;
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
      postCreatedTime: new Date().toString(),
      postCreatedDate: new Date().toString(),
    },
    select: (post) => {
      const [date, time] = post.postCreatedTime.split("T");
      const [year, month, day] = date.split("-");
      const [hour, minute, _] = time.split(":");

      const openDateTime = new Date(
        +year,
        +month - 1,
        +day,
        +hour + 4,
        +minute,
      );
      return { ...post, openDateTime };
    },
  });
};
