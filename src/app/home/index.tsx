import { GoToWrite } from "./go-to-write";
import { ToBeOpened } from "./to-be-opened";
import { ToMyArchive } from "./to-my-archive";

import { HomeLayout } from "@/components/layout/home-layout";

const DUMMY_DATA = [
  {
    imgUrl:
      "https://cdn.pixabay.com/photo/2021/02/02/07/51/clover-5973019_640.jpg",
    count: 10,
    date: new Date("2023-02-11"),
    keyword: "새로운",
  },
  {
    imgUrl:
      "https://i.pinimg.com/originals/3d/96/a2/3d96a2b1cd17b083515e651e3c49158c.jpg",
    count: 23,
    date: new Date("2023-05-13"),
    keyword: "신나는",
  },
  {
    imgUrl: "https://pbs.twimg.com/media/EA9UJBjU4AAdkCm.jpg",
    count: 19,
    date: new Date("2023-11-12"),
    keyword: "굉장한",
  },
];

export const Home = () => {
  return (
    <HomeLayout>
      <div className="flex flex-col gap-12 pb-[60px] pt-4">
        <GoToWrite />
        <ToBeOpened />
        <ToMyArchive archive={DUMMY_DATA} />
        {/*<ToMyArchive archive={[]} />*/}
      </div>
    </HomeLayout>
  );
};
