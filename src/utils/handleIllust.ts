type IllustType = {
  postId: number;
  illustId: number;
};

export const handleIllust = {
  get: (postId: number): number => {
    const illustList = JSON.parse(
      localStorage.getItem("illust") ?? "[]",
    ) as IllustType[];

    let idx = illustList.findIndex((i) => i.postId === postId);

    if (idx === -1) {
      idx = postId % 12;
      illustList.push({ postId, illustId: idx });
      localStorage.setItem("illust", JSON.stringify(illustList));
    }

    return illustList[idx].illustId;
  },

  remove: (postId: number): void => {
    let illustList = JSON.parse(
      localStorage.getItem("illust") ?? "[]",
    ) as IllustType[];

    illustList = illustList.filter((i) => i.postId !== postId);
    localStorage.setItem("illust", JSON.stringify(illustList));
  },
};
