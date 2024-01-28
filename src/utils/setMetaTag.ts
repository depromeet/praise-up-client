export const setMetaTags = ({
  title = "이미지로 소통하며 칭찬 주고 받기",
  description = "praise-up",
}) => {
  (
    document.querySelector('meta[property="og:title"]') as HTMLElement
  ).setAttribute("content", `${title}`);

  (
    document.querySelector('meta[property="og:description"]') as HTMLElement
  ).setAttribute("content", description);
};
