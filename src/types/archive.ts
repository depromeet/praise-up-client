export type TRouteState = {
  state: {
    postId: number;
  };
};

export type TMarbleCard = {
  content: string;
  imageUrl: string;
  isRead: boolean;
  keyword: string;
  postCreatedDate: string;
  userNickname: string;
  visible: boolean;
};

export type TMarbleObject = {
  id: number;
  textContent: string;
  isViewed?: boolean;
};

export type TArchiveView =
  | "preview-card"
  | "preview-summary"
  | "marble-canvas"
  | "marble-grid";

// API
export type TMarbleListRes = {
  totalPages: number;
  totalElements: number;
  pageable: {
    pageNumber: number;
  };
  content: TMarble[];
};

export type TMarbleListPayload = {
  page: number;
  size?: number;
};

export type TMarble = {
  commentId: number;
  nickname: string;
  content: string;
  imageUrl: string;
};
