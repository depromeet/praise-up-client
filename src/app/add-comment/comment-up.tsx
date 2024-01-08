import BgCirclesSVG from "@/assets/imgs/marbles.svg?react";
import { DraggableMarble } from "@/components/app/add-comment/draggable-marble";
import { LayeredBackground } from "@/components/app/add-comment/layered-background";
import { AnimatedArrow } from "@/components/common/animated-arrow";
import { DefaultLayout } from "@/components/layout/default";

export const CommentUpPage = () => {
  return (
    <DefaultLayout>
      <LayeredBackground>
        <BgCirclesSVG className="absolute left-0 top-0 rotate-180 -scale-x-100" />
        <div className="mt-[32px] flex h-full w-full flex-col items-center justify-center gap-[46px]">
          <div className="flex flex-col items-center justify-center gap-[50px]">
            <AnimatedArrow />
            <DraggableMarble nickname="쥐렁이" />
          </div>
          <div className="text-h3 flex flex-col items-center gap-1.5 text-primary">
            <h3>구슬을 위로 밀어서</h3>
            <h3>칭찬구슬을 전달하세요</h3>
          </div>
        </div>
      </LayeredBackground>
    </DefaultLayout>
  );
};
