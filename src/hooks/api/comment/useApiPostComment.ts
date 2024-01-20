import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";

export const useApiPostComment = () => {
  const naviagate = useNavigate();

  const postComment = async (formData: FormData) => {
    const postId = sessionStorage.getItem("comment_id") as string;

    const res = await api.post(
      `/praise-up/api/v1/posts/${postId}/comments`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res;
  };

  return useMutation({
    mutationFn: (formData: FormData) => postComment(formData),
    onSuccess: () => {
      sessionStorage.removeItem("comment_nickname");
      sessionStorage.removeItem("comment_image");
      sessionStorage.removeItem("comment_message");
    },
    onError: () => naviagate("/error"),
  });
};
