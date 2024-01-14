import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

export const useApiMarbleComments = () => {
  const deleteComment = async (commentId: number) => {
    const res = await api.delete(`/praise-up/api/v1/comments/${commentId}`);
    return res;
  };

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
  });
};
