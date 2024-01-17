import { MouseEvent, useEffect, useState, TouchEvent } from "react";

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

  useEffect(() => {
    if (isReached) {
      void done();
    } else {
      setArrowShow(true);
    }
  }, [isReached]);

  useEffect(() => {
    const arrow = document.getElementById("arrow-div");
    const marble = document.getElementById("draggable-marble");
    const ARROW_POS_Y = arrow?.getBoundingClientRect().top as number;

    // desktop mouse event
    const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
      const target = e.target as HTMLElement;
      if (!marble?.contains(target) || !arrow) return;

      const handleMouseMove = () => {
        if (ARROW_POS_Y >= target.getBoundingClientRect().top)
          setArrowShow(false);
      };

      const handleMouseUp = () => {
        if (ARROW_POS_Y > target.getBoundingClientRect().top || isReached)
          setArrowShow(false);
        else setArrowShow(true);

        window.removeEventListener("mousemove", handleMouseMove);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp, { once: true });
    };

    // mobile touch event
    const handleTouchStart = (t: TouchEvent<HTMLElement>) => {
      console.log("touchStart");
      const target = t.target as HTMLElement;
      if (!marble?.contains(target) || !arrow) return;

      const handleTouchMove = () => {
        console.log("touchMove");
        if (ARROW_POS_Y >= target.getBoundingClientRect().top)
          setArrowShow(false);
      };

      const handleTouchEnd = () => {
        console.log("touchEnd");
        if (ARROW_POS_Y > target.getBoundingClientRect().top || isReached)
          setArrowShow(false);
        else setArrowShow(true);

        window.removeEventListener("touchmove", handleTouchMove);
      };

      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd, { once: true });
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("touchstart", handleTouchStart);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

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
            <div className="relative flex h-full flex-col items-center justify-end gap-[50px]">
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
