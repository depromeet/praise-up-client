import { ReactNode } from "react";

interface BlurredAppbar {
  left: ReactNode;
  title: string;
}

export const BlurredAppbar = ({ left, title }: BlurredAppbar) => {
  return (
    <div className="sticky left-0 top-0 z-30 flex h-64px w-full items-center justify-center bg-oncolor/80 after:absolute after:z-20 after:h-64px after:w-full after:backdrop-blur-[10px]">
      <div className="absolute left-0 z-30 ml-5">{left}</div>
      <span className="text-h4 z-30 text-primary">{title}</span>
    </div>
  );
};
