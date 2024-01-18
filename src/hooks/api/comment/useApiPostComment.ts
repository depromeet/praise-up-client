import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";

export const useApiPostComment = () => {
  const naviagate = useNavigate();

  const postComment = async (formData: FormData) => {
    const POST_ID = 6; // url에서 가져온 postId
    // 없는 PostId라면 에러 핸들링.
    const res = await api.post(
      `/praise-up/api/v1/posts/${POST_ID}/comments`,
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
    onSuccess: () => naviagate("/clap/up"),
    onError: () => naviagate("/error"),
  });
};
