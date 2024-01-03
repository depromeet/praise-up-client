import { useState, Children } from "react";

interface CarouselProps {
  children: React.ReactNode;
}

export const Carousel = ({ children }: CarouselProps) => {
  const [current, setCurrent] = useState<number>(0);

  // desktop
  const [mouseDownClientX, setMouseDownClientX] = useState(0);

  // mobile
  const [touchedXY, setTouchedXY] = useState({ x: 0, y: 0 });

  const moveStyle: { [key: number]: string } = {};
  for (let i = 0; i < Children.count(children); i++) {
    moveStyle[i] = `-${i * 100}%`;
  }

  const next = () => {
    if (current === Children.count(children) - 1) return;
    setCurrent(current + 1);
  };

  const prev = () => {
    if (current === 0) return;
    setCurrent((current) => current - 1);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientX(e.clientX);
    setMouseDownClientX(e.clientY);
  };

  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const distanceX = mouseDownClientX - e.clientX;

    if (distanceX > 50) {
      next();
    } else if (distanceX < -50) {
      prev();
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchedXY({
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY,
    });
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const distanceX = touchedXY.x - e.changedTouches[0].pageX;
    const distanceY = touchedXY.y - e.changedTouches[0].pageY;
    const vector = Math.abs(distanceX / distanceY);

    if (distanceX > 50 && vector > 2) {
      next();
    } else if (distanceX < -50 && vector > 2) {
      prev();
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex h-fit w-full overflow-hidden">
        <div
          className={`flex w-full items-center transition-all duration-300 ease-in-out [&>*]:w-full [&>*]:shrink-0`}
          style={{ transform: `translateX(${moveStyle[current]})` }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {children}
        </div>
      </div>
      <ul className="flex items-start gap-2">
        {Children.map(children, (_, i) => (
          <li
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 w-1.5 rounded-full ${
              i === current ? "bg-gray-600" : "bg-gray-400"
            }`}
          >
            {" "}
          </li>
        ))}
      </ul>
    </div>
  );
};
