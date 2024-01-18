import { useLocation, useParams } from "react-router-dom";

import { TimerCardView } from "./timer-card-view";

import { ButtonProvider } from "@/components/common/button-provider";
import { PostCardView } from "@/components/common/post-card-view";
import { DefaultLayout } from "@/components/layout/default";
import { toast } from "@/helpers/toast";
import {
  GetOnePostType,
  useApiGetOnePost,
} from "@/hooks/api/unpublished-post/useApiGetOnePost";

interface DataType extends GetOnePostType {
  id: string;
  username?: string;
  openDate?: string;
}

/* 예제 시간 */
const date = new Date();
const test_date = new Date(date.setDate(date.getDate() + 2)).toISOString();

const DUMMY_DATA: DataType = {
  id: "1",
  username: "지영",
  keyword: "센스있는",
  openDate: test_date, // 아직 백엔드에서 받아오지 않음
  imageUrl:
    "https://scontent-gmp1-1.xx.fbcdn.net/v/t1.6435-9/67807465_366134437398754_998148471150084096_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=uthxU3ZArWkAX8v-Vwu&_nc_ht=scontent-gmp1-1.xx&oh=00_AfDvNo-8nSSQC77hyhY8QD73Gpx2wj6HsoW5WRnyKWO4OA&oe=65B8CEF6",
  content: `한시간만에 뚝딱 완성한 나의 첫 요리😆 \n 간단한 요리지만 너무 뿌듯하다!`,
  visible: test_date < Date.now().toString(),
  postCreatedDate: new Date().toString(),
};

export const UnpublishedPostPage = () => {
  const { id } = useParams();
  const { data } = useApiGetOnePost(id);
  const {
    state: { backgroundUrl },
  } = useLocation() as { state: { backgroundUrl: string } };

  const handleShare = () => {
    // TODO: 클립보드에 링크 복사하기
    toast("링크가 복사되었어요");
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <h2 className="text-h2">공개 예정 칭찬게시물</h2>
        <div className="flex flex-col gap-3">
          {!data?.visible && <TimerCardView openDate={DUMMY_DATA.openDate} />}
          <div className="perspective-1000 bg-transparent">
            <div className="[transform-style: preserve-3d] relative">
              <PostCardView {...data} isReadyCard>
                <PostCardView.Title />
                <PostCardView.Preview imageUrl={backgroundUrl} />
              </PostCardView>
              <PostCardView {...data}>
                <PostCardView.Title />
                <PostCardView.Image />
              </PostCardView>
            </div>
          </div>
        </div>
      </div>
      <ButtonProvider>
        <ButtonProvider.Primary onClick={() => handleShare()}>
          링크 공유하고 칭찬 받기
        </ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
};
