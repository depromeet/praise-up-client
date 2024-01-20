export const UseCurrentLinkCopy = (postId: number) => {
  const origin = window.location.origin;
  const scaledPostId = btoa(
    encodeURIComponent(`clap?postId=${postId.toString()}`),
  );
  const shareURL = origin + `/${scaledPostId}`;
  void navigator.clipboard.writeText(shareURL);
};
