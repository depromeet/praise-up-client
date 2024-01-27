import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";

const deletePost = async (postId: number) =>
  api.delete(`/praise-up/api/v1/posts/${postId}`);

export const useApiDeletePost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["unread-post"] });
      navigate("/main");
    },
    onError: (e) => console.log(e),
  });
};
