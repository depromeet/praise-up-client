import {
  useState,
  MouseEvent,
  TouchEvent,
  Dispatch,
  SetStateAction,
} from "react";

import MarbleLargeSVG from "@/assets/imgs/marble_lg.svg?react";

interface DraggableMarbleProps {
  isReached: boolean; // when target distance is reached
  setIsReached: Dispatch<SetStateAction<boolean>>;
  flyDuration?: number; // sec
  nickname: string; // nickname on marble
}

// 구슬이 원위치로 돌아가지 않는 최소 이동거리
const MIN_DISTANCE_DESKTOP = 150;
const MIN_DISTANCE_MOBILE = 100;

export const DraggableMarble = ({
  isReached,
  setIsReached,
  flyDuration = 1,
  nickname,
}: DraggableMarbleProps) => {
  const [posY, setPosY] = useState(0);
  const [touchedY, setTouchedY] = useState(0);

  const FADEOUT_STYLE = {
    transition: `all ${flyDuration}s cubic-bezier(0.4, 0, 1, 1) `,
    transform: "translateY(-50vh)",
    opacity: 0,
  };

  const onMouseDown = (mouseDownEvent: MouseEvent<HTMLElement>) => {
    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.screenY - mouseDownEvent.screenY;
      if (deltaY > 0) return;
      setPosY(posY + deltaY);
    };

    const mouseUpHandler = (moveEvent: MouseEvent<HTMLElement>) => {
      if (mouseDownEvent.pageY - moveEvent.pageY < MIN_DISTANCE_DESKTOP)
        setPosY(0);
      else setIsReached(true);

      document.removeEventListener(
        "mousemove",
        mouseMoveHandler as unknown as EventListenerOrEventListenerObject,
      );
    };

    document.addEventListener(
      "mousemove",
      mouseMoveHandler as unknown as EventListenerOrEventListenerObject,
    );
    document.addEventListener(
      "mouseup",
      mouseUpHandler as unknown as EventListenerOrEventListenerObject,
      { once: true },
    );
  };

  const onTouchStart = (touchStartEvent: TouchEvent) => {
    const onTouchMove = (moveEvent: TouchEvent) => {
      const deltaY =
        moveEvent.changedTouches[0].screenY -
        touchStartEvent.changedTouches[0].screenY;
      if (deltaY > 0) return;
      setTouchedY(touchedY + deltaY);
    };

    const onTouchEnd = (moveEvent: TouchEvent) => {
      if (
        touchStartEvent.changedTouches[0].pageY -
          moveEvent.changedTouches[0].pageY <
        MIN_DISTANCE_MOBILE
      )
        setTouchedY(0);
      else setIsReached(true);

      document.removeEventListener(
        "touchmove",
        onTouchMove as unknown as EventListenerOrEventListenerObject,
      );
    };

    document.addEventListener(
      "touchmove",
      onTouchMove as unknown as EventListenerOrEventListenerObject,
    );
    document.addEventListener(
      "touchend",
      onTouchEnd as unknown as EventListenerOrEventListenerObject,
      { once: true },
    );
  };

  return (
    <div
      id="draggable-marble"
      className="group relative z-20 cursor-grab active:cursor-grabbing"
      style={{
        transform: `translateY(${posY | touchedY}px)`,
        transition: "ease-in-out",
        ...(isReached ? FADEOUT_STYLE : {}),
      }}
      onMouseDown={onMouseDown} // desktop
      onTouchStart={onTouchStart} // mobile
    >
      <MarbleLargeSVG className=" h-[180px] w-[180px] transition-[scale_0.2s] duration-200 ease-in group-hover:scale-110" />
      <h4 className="text-h4 absolute bottom-[42px] right-[44px] select-none text-teritary transition-[scale_0.2s] duration-200 ease-in group-hover:text-[110%]">
        {nickname}
      </h4>
    </div>
  );
};
