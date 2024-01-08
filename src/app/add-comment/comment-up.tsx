import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BgCirclesSVG from "@/assets/imgs/marbles.svg?react";
import { DraggableMarble } from "@/components/app/add-comment/draggable-marble";
import { LayeredBackground } from "@/components/app/add-comment/layered-background";
import { AnimatedArrow } from "@/components/common/animated-arrow";
import { Header } from "@/components/common/header";
import { DefaultLayout } from "@/components/layout/default";

const FLY_DURATION = 1; // second

export const CommentUpPage = () => {
  const [isReached, setIsReached] = useState<boolean>(false);

  const navigate = useNavigate();

  // navigate after animation (duration: FLY_DURATION)
  useEffect(() => {
    if (isReached) {
      void handleMove();
    }
  }, [isReached]);

  const handleMove = async () => {
    await new Promise(() =>
      setTimeout(() => {
        navigate("/clap/done");
      }, FLY_DURATION * 1000),
    );
  };

  return (
    <DefaultLayout>
      <LayeredBackground>
        <BgCirclesSVG className="absolute left-0 top-0 rotate-180 -scale-x-100" />
        <div className="mt-[32px] flex h-full w-full flex-col items-center justify-center gap-[46px]">
          <div className="flex flex-col items-center justify-center gap-[50px]">
            <AnimatedArrow />
            <DraggableMarble
              isReached={isReached}
              setIsReached={setIsReached}
              flyDuration={FLY_DURATION}
              nickname="쥐렁이"
            />
          </div>
          <Header
            className="text-center"
            text={`{구슬을 위로 밀어서}\\n{칭찬 구슬을 전달하세요!}`}
          />
        </div>
      </LayeredBackground>
    </DefaultLayout>
  );
};
