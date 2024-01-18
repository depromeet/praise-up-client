import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";

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
    return res;
  };

  return useMutation({
    mutationFn: (formData: FormData) => postBoard(formData),
    onSuccess: () => {
      naviagate("/post/done");
    },
    onError: () => {
      naviagate("/error");
    },
  });
};
