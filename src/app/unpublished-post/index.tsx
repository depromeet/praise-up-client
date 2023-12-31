import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { PostCardView } from "./post-card-view";
import { TimerCardView } from "./timer-card-view";

import { DefaultLayout } from "@/components/layout/default";

interface DataType {
  id: string;
  username: string;
  keyword: string;
  imgUrl: string;
  content: string;
}

const DUMMY_DATA: DataType = {
  id: "1",
  username: "지영",
  keyword: "센스있는",
  imgUrl:
    "https://scontent-gmp1-1.xx.fbcdn.net/v/t1.6435-9/67807465_366134437398754_998148471150084096_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=uthxU3ZArWkAX8v-Vwu&_nc_ht=scontent-gmp1-1.xx&oh=00_AfDvNo-8nSSQC77hyhY8QD73Gpx2wj6HsoW5WRnyKWO4OA&oe=65B8CEF6",
  content: `한시간만에 뚝딱 완성한 나의 첫 요리😆 <br /> 간단한 요리지만 너무 뿌듯하다!`,
};

export const UnpublishedPostPage = () => {
  // TODO: id를 이용해서 서버에서 데이터를 가져오기
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <h2 className="text-h2">공개 예정 칭찬게시물</h2>
        <div className="flex flex-col gap-3">
          {/* timer 값으로는 메인페이지 개발시 구현한 useTimer 훅 사용 예정*/}
          <TimerCardView timer={"20:13:27"} />
          <PostCardView {...DUMMY_DATA}>
            <PostCardView.Title />
            <PostCardView.Image />
          </PostCardView>
        </div>
      </div>

      <div className="fixed bottom-8 flex w-full -translate-x-5 justify-center px-5 pb-8 pt-3">
        {/* TODO: 추후에 공통 버튼 컴포넌트로 변경 */}
        <button
          className="text-b2-strong absolute rounded-2 bg-primary px-[52px] py-4 text-oncolor"
          onClick={() => console.log("링크가 복사됨")}
        >
          링크 공유하고 칭찬 받기
        </button>
      </div>
    </DefaultLayout>
  );
};
