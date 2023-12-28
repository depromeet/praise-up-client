import { PastCard } from "./past-card";

const DUMMY_DATE = [
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

export const ToMyArchive = () => {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-h2">나의 칭찬 게시물</h2>
      <div className="grid grid-cols-2 gap-2">
        {[...DUMMY_DATE].reverse().map((d, i) => (
          <PastCard key={i} {...d} />
        ))}
      </div>
    </section>
  );
};
