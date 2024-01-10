import { useContext } from "react";

import {
  PostCardViewContext,
  PostCardContextProps,
} from "@/components/common/post-card-view";

export const usePostCardView = () => {
  const context = useContext<PostCardContextProps | undefined>(
    PostCardViewContext,
  );
  if (context === undefined)
    throw new Error("usePostCardView must be used within a <PostCardView />");
  return context;
};
