import clsx from "clsx";
import {
  MouseEvent,
  useEffect,
  useState,
  TouchEvent,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

import { CommentDoneView } from "./comment-done";

import { NotFound } from "@/app/error/404";
import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import Marbles from "@/assets/imgs/marbles.svg?react";
import { DraggableMarble } from "@/components/app/add-comment/draggable-marble";
import { LayeredBackground } from "@/components/app/add-comment/layered-background";
import { Arrow } from "@/components/common/arrow";
import { Header } from "@/components/common/header";
import { DefaultLayout } from "@/components/layout/default";
import { useApiPostComment } from "@/hooks/api/comment/useApiPostComment";

const FLY_DURATION = 0.5; // second
const ARROW_DISAPPEAR_DIST = 100; // the distance arrow disappears when marble moves
const DONE_ANIMATION = {
  transition: "all 0.5s ease-in-out 0s",
  duration: 200,
  transform: "translateX(-100%)",
};

export const CommentUpPage = () => {
  const [isReached, setIsReached] = useState<boolean>(false);
  const [arrowShow, setArrowShow] = useState<boolean>(true);
  const [move, setMove] = useState<boolean>(false);
  const { mutate } = useApiPostComment();
  const navigate = useNavigate();

  async function getBlobFromUrl(blobUrl: string) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return blob;
  }

  const createPost = useCallback(() => {
    try {
      const nickname = sessionStorage.getItem("comment_nickname") as string;
      const image = sessionStorage.getItem("comment_image") as string;
      const content = sessionStorage.getItem("comment_message") as string;

      const blob = getBlobFromUrl(image);

      void blob.then((res) => {
        const file = new File([res], "image.jpeg", {
          type: "image/jpeg",
        });

        const formData = new FormData();
        formData.append("nickname", nickname);
        formData.append("image", file);
        formData.append("content", `${content}`);
        mutate(formData);
      });
    } catch (error) {
      return <NotFound />;
    }
  }, [mutate]);

  useEffect(() => {
    if (isReached) {
      setArrowShow(false);
      void done();
      createPost();
    } else {
      setArrowShow(true);
    }
  }, [isReached, createPost]);

  // desktop mouse event
  const onMouseDown = (mouseDownEvent: MouseEvent<HTMLElement>) => {
    const onMouseMove = (mouseMoveEvent: MouseEvent<HTMLElement>) => {
      if (
        mouseDownEvent.screenY - mouseMoveEvent.screenY >=
        ARROW_DISAPPEAR_DIST
      )
        setArrowShow(false);
    };

    const onMouseUp = (mouseUpEvent: MouseEvent<HTMLElement>) => {
      if (
        mouseDownEvent.screenY - mouseUpEvent.screenY >= ARROW_DISAPPEAR_DIST ||
        isReached
      )
        setArrowShow(false);
      else setArrowShow(true);

      window.removeEventListener(
        "mousemove",
        onMouseMove as unknown as EventListenerOrEventListenerObject,
      );
    };

    window.addEventListener(
      "mousemove",
      onMouseMove as unknown as EventListenerOrEventListenerObject,
    );
    window.addEventListener(
      "mouseup",
      onMouseUp as unknown as EventListenerOrEventListenerObject,
      { once: true },
    );
  };

  // mobile touch event
  const onTouchStart = (startT: TouchEvent) => {
    const startTarget = startT.changedTouches[0];
    const onTouchMove = (t: TouchEvent) => {
      const target = t.changedTouches[0];
      if (startTarget.clientY - target.clientY >= ARROW_DISAPPEAR_DIST)
        setArrowShow(false);
    };

    const onTouchEnd = (t: TouchEvent) => {
      const target = t.changedTouches[0];

      if (
        startTarget.clientY - target.clientY >= ARROW_DISAPPEAR_DIST ||
        isReached
      )
        setArrowShow(false);
      else setArrowShow(true);

      window.removeEventListener(
        "touchmove",
        onTouchMove as unknown as EventListenerOrEventListenerObject,
      );
    };

    window.addEventListener(
      "touchmove",
      onTouchMove as unknown as EventListenerOrEventListenerObject,
    );
    window.addEventListener(
      "touchend",
      onTouchEnd as unknown as EventListenerOrEventListenerObject,
      { once: true },
    );
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
      <DefaultLayout
        className="overflow-hidden"
        appbar={
          <div className=" flex h-[64px] w-full px-5 py-2.5">
            <button
              className={clsx("z-20", "hidden" && isReached)}
              onClick={() => navigate(-1)}
            >
              <ChevronLeftEdgeSVG />
            </button>
          </div>
        }
      >
        <LayeredBackground>
          {/* backgroun area */}
          <div className="absolute left-0 top-0 w-full ">
            <Marbles className="-z-10 w-full  rotate-180" />
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
              {arrowShow && <Arrow />}
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
