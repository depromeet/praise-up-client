import { MouseEvent, useEffect, useState, TouchEvent, useRef } from "react";

import { CommentDoneView } from "./comment-done";

import Marbles from "@/assets/imgs/marbles.svg?react";
import { DraggableMarble } from "@/components/app/add-comment/draggable-marble";
import { LayeredBackground } from "@/components/app/add-comment/layered-background";
import { Arrow } from "@/components/common/arrow";
import { Header } from "@/components/common/header";
import { DefaultLayout } from "@/components/layout/default";

const FLY_DURATION = 0.5; // second
const DONE_ANIMATION = {
  transition: "all 0.5s ease-in-out 0s",
  duration: 200,
  transform: "translateX(-100%)",
};

export const CommentUpPage = () => {
  const [isReached, setIsReached] = useState<boolean>(false);
  const [arrowShow, setArrowShow] = useState<boolean>(true);
  const [move, setMove] = useState<boolean>(false);
  const ARROW_POS_Y = useRef<number>(0);

  useEffect(() => {
    const arrow = document.getElementById("arrow-div");
    ARROW_POS_Y.current = arrow?.getBoundingClientRect().top as number;
  }, []);

  useEffect(() => {
    if (isReached) {
      void done();
    } else {
      setArrowShow(true);
    }
  }, [isReached]);

  // desktop mouse event
  const onMouseDown = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    const onMouseMove = () => {
      if (ARROW_POS_Y.current >= target.getBoundingClientRect().top)
        setArrowShow(false);
    };

    const onMouseUp = () => {
      if (ARROW_POS_Y.current > target.getBoundingClientRect().top || isReached)
        setArrowShow(false);
      else setArrowShow(true);

      window.removeEventListener("mousemove", onMouseMove);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp, { once: true });
  };

  // mobile touch event
  const onTouchStart = (_: TouchEvent) => {
    const onTouchMove = (t: TouchEvent) => {
      const target = t.changedTouches[0];
      if (ARROW_POS_Y.current >= target.clientY - 80) setArrowShow(false);
    };

    const onTouchEnd = (t: TouchEvent) => {
      const target = t.changedTouches[0];

      if (isReached || ARROW_POS_Y.current > target.clientY - 80)
        setArrowShow(false);
      else setArrowShow(true);

      window.removeEventListener("touchmove", onTouchMove);
    };

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd, { once: true });
  };

  const done = async () => {
    await new Promise(() =>
      setTimeout(() => {
        setMove(true);
      }, FLY_DURATION * 1000),
    );
  };

  return (
    <>
      <DefaultLayout className="overflow-hidden">
        <LayeredBackground>
          {/* backgroun area */}
          <div className="absolute left-0 top-0 w-full ">
            <Marbles className=" -z-10 w-full rotate-180" />
            <div
              className={`absolute left-0 top-0 z-10 h-full w-full bg-[linear-gradient(180deg,_#ffffff60_15.62%,_#ffffff00_81.25%)] `}
            ></div>
          </div>

          <section className="absolute  bottom-0 left-0 mb-[70px] flex h-full w-full flex-col gap-[46px]">
            <div
              className="relative mx-auto flex h-full w-fit flex-col items-center justify-end gap-[50px]"
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
            >
              {arrowShow && (
                <div id="arrow-div">
                  <Arrow />
                </div>
              )}
              <DraggableMarble
                isReached={isReached}
                setIsReached={setIsReached}
                flyDuration={FLY_DURATION}
                nickname="쥐렁이"
              />
            </div>
            <Header
              className="select-none text-center"
              text={`{구슬을 위로 밀어서}\\n{칭찬 구슬을 전달하세요!}`}
            />
          </section>
        </LayeredBackground>

        <CommentDoneView transition={move ? DONE_ANIMATION : null} />
      </DefaultLayout>
    </>
  );
};
