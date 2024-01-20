import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
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

export const useApiBoard = () => {
  const naviagate = useNavigate();

  const postBoard = async (formData: FormData) => {
    const USER_ID = Cookies.get("k-u-id");
    const res = await api.post(
      `/praise-up/api/v1/posts?userId=${USER_ID}`,
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
      naviagate("/post/done", { state: { postId: res.postId } });
    },
    onError: () => {
      naviagate("/error");
    },
  });
};
