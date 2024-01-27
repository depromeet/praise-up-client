import _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ChevronRightEdgeSVG } from "@/assets/icons/chevron-right-edge";
import { CardSwiper } from "@/components/app/home/card-swiper";
import { EmptyCard } from "@/components/app/home/empty-card";
import { PastCard } from "@/components/app/home/past-card";
import { RecentCard } from "@/components/app/home/recent-card";
import { HomeLayout } from "@/components/layout/home-layout";
import {
  ContentDataType,
  GetPostType,
  useApiGetReadPosts,
} from "@/hooks/api/main/useApiGetReadPosts";
import { useApiGetUnreadPosts } from "@/hooks/api/main/useApiGetUnreadPosts";

const GoToWrite = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-between gap-1 rounded-4 bg-white p-5 hover:cursor-pointer"
      onClick={() => navigate("/post/keyword")}
    >
      <div>
        <span className="text-b3-compact text-gray-700">
          게시물은 하루에 한개만 작성할 수 있어요
        </span>
        <h3 className="text-h3 text-active">오늘의 게시물 작성하기</h3>
      </div>
      <ChevronRightEdgeSVG />
    </div>
  );
};

const ToBeOpened = ({ posts }: { posts?: ContentDataType[] }) => {
  return (
    <div className="mb-4 flex flex-col gap-5">
      <h2 className="text-h2 text-gray-900">공개 예정 칭찬게시물</h2>
      {!posts?.length ? (
        <EmptyCard
          text="오늘의 게시물을 작성하지 않았어요"
          subText="상단의 버튼을 눌러 게시물을 작성해보세요"
        />
      ) : (
        <CardSwiper>
          {posts?.map((content, idx) => <RecentCard key={idx} {...content} />)}
        </CardSwiper>
      )}
    </div>
  );
};

interface ToMyArchiveProps {
  posts: ContentDataType[];
}

export const ToMyArchive = ({ posts }: ToMyArchiveProps) => {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-h2">나의 칭찬 게시물</h2>
      {posts.length === 0 ? (
        <EmptyCard
          text={"아직 공개된 칭찬게시물이 없어요"}
          subText={"공개 된 칭찬게시물은 이곳에 자동으로 나열돼요"}
        />
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {posts.map((post, idx) => (
            <PastCard key={idx} {...post} />
          ))}
        </div>
      )}
    </section>
  );
};

export const Home = () => {
  const { data: unreadPosts } = useApiGetUnreadPosts();
  const {
    data: archivePosts,
    hasNextPage,
    fetchNextPage,
  } = useApiGetReadPosts();
  const [todayUpload, setTodayUpload] = useState<boolean>(true);

  useEffect(() => {
    if (!unreadPosts) return;
    if (unreadPosts.length > 0) {
      const lastPostDate = new Date(
        unreadPosts[unreadPosts.length - 1].postCreatedDate,
      );
      const today = new Date();
      if (
        lastPostDate.getFullYear() === today.getFullYear() &&
        lastPostDate.getMonth() === today.getMonth() &&
        lastPostDate.getDate() === today.getDate()
      )
        setTodayUpload(false);
      return;
    }
    setTodayUpload(true);
  }, [unreadPosts]);

  useEffect(() => {
    const handleScroll = _.throttle(async () => {
      if (!hasNextPage) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      )
        await fetchNextPage();
    }, 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [unreadPosts, fetchNextPage, hasNextPage]);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-12 pb-[60px] pt-4">
        {todayUpload && <GoToWrite />}
        <ToBeOpened posts={unreadPosts} />
        <ToMyArchive
          posts={
            (archivePosts?.pages.reduce(
              (contents: ContentDataType[], currPage: GetPostType) => [
                ...(contents ?? []),
                ...(currPage.content ?? []),
              ],
              [],
            ) as ContentDataType[]) ?? []
          }
        />
      </div>
    </HomeLayout>
  );
};
