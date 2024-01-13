export type TMarble = {
  id: number;
  imageUrl: string;
  user: string;
  content: string;
};

export type TMarbleObject = {
  id: number;
  texture: string;
  textContent: string;
  isViewed?: boolean;
};

export type TArchiveView = "preview" | "canvas" | "grid";
