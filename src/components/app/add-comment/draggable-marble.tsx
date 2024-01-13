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
const MIN_DISTANCE_DESKTOP = 200;
const MIN_DISTANCE_MOBILE = 150;

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
    transform: "translateY(-800px)",
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

      document.removeEventListener("mousemove", mouseMoveHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler, { once: true });
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

      document.removeEventListener("touchmove", onTouchMove);
    };

    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd, { once: true });
  };

  return (
    <div
      className="relative z-20 cursor-grab"
      style={{
        transform: `translateY(${posY | touchedY}px)`,
        transition: "ease-in-out",
        ...(isReached ? FADEOUT_STYLE : {}),
      }}
      onMouseDown={onMouseDown} // desktop
      onTouchStart={onTouchStart} // mobile
    >
      <MarbleLargeSVG className="h-[180px] w-[180px]" />
      <h4 className="text-h4 absolute bottom-[42px] right-[44px] text-teritary">
        {nickname}
      </h4>
    </div>
  );
};
