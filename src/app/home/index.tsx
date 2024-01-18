import _ from "lodash";
import { useEffect, useRef } from "react";

import { GoToWrite } from "./go-to-write";
import { ToBeOpened } from "./to-be-opened";
import { ToMyArchive } from "./to-my-archive";

import { HomeLayout } from "@/components/layout/home-layout";
import {
  ContentDataType,
  GetPostType,
  useApiGetReadPosts,
} from "@/hooks/api/main/useApiGetReadPosts";

export const Home = () => {
  const scrollAreaRef = useRef(null);
  const { data, hasNextPage, fetchNextPage } = useApiGetReadPosts();

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
  }, [data, fetchNextPage, hasNextPage]);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-12 pb-[60px] pt-4" ref={scrollAreaRef}>
        <GoToWrite />
        <ToBeOpened />
        <ToMyArchive
          archive={
            (data?.pages.reduce(
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
