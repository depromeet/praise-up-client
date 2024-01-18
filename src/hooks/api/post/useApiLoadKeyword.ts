import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { keywordProps } from "@/components/app/post/keyword/selector";

export const useApiLoadKeyword = () => {
  const loadKeyword = async () => {
    const res = await api.get(
      "/praise-up/api/v1/keywords/recommendation?size=5",
    );
    return res.data as keywordProps;
  };

  return useQuery({ queryKey: ["keyword"], queryFn: () => loadKeyword() });
};
