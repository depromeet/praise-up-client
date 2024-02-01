import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";

type TPostBoardResponse = {
  postId: number;
  userNickname: string;
  content: string;
  imageUrl: string;
  keyword: string;
  visible: boolean;
  isRead: boolean;
  postCreatedDate: string;
};

export const useApiBoard = (userId: number) => {
  const navigate = useNavigate();

  const postBoard = async (formData: FormData) => {
    const res = await api.post(
      `/praise-up/api/v1/posts?userId=${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data as TPostBoardResponse;
  };

  return useMutation({
    mutationFn: (formData: FormData) => postBoard(formData),
    onSuccess: (res) => {
      navigate("/post/done", { state: { postId: res.postId } });
    },
    onError: () => {
      navigate("/error");
    },
  });
};
