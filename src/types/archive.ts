export type TMarbleObject = {
  id: number;
  texture: string;
  textContent: string;
  isViewed?: boolean;
};

export type TArchiveView = "preview" | "canvas" | "grid";

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
  size: number;
};

export type TMarble = {
  commentId: number;
  nickname: string;
  content: string;
  imageUrl: string;
};
