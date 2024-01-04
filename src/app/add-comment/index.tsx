import { ButtonGroup } from "./button-group";
import { PostArea } from "./post-area";

import { DefaultLayout } from "@/components/layout/default";

export const AddCommentPage = () => {
  return (
    <DefaultLayout>
      <PostArea />
      <ButtonGroup />
    </DefaultLayout>
  );
};
