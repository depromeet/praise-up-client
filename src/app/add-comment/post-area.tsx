import { PostCardView } from "@/components/common/post-card-view";

const DUMMY_DATA = {
  id: "1",
  username: "지영",
  keyword: "센스있는",
  imgUrl:
    "https://scontent-gmp1-1.xx.fbcdn.net/v/t1.6435-9/67807465_366134437398754_998148471150084096_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=uthxU3ZArWkAX8v-Vwu&_nc_ht=scontent-gmp1-1.xx&oh=00_AfDvNo-8nSSQC77hyhY8QD73Gpx2wj6HsoW5WRnyKWO4OA&oe=65B8CEF6",
  content: `한시간만에 뚝딱 완성한 나의 첫 요리😆 \n 간단한 요리지만 너무 뿌듯하다!`,
};

export const PostArea = () => {
  // TODO: 사용자 정보 GET

  return (
    <section className="flex flex-col justify-between gap-9 px-5 py-4">
      <h2 className="text-h2">{DUMMY_DATA.username}님의 칭찬게시물</h2>
      <PostCardView {...{ ...DUMMY_DATA, isPublic: true }}>
        <PostCardView.Title />
        <PostCardView.Image />
      </PostCardView>
    </section>
  );
};
