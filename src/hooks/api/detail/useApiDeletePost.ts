import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";

const deletePost = async (postId: number) =>
  api.delete(`/praise-up/api/v1/posts/${postId}`);

export const useApiDeletePost = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => navigate("/main"),
    onError: (e) => console.log(e),
  });
};
