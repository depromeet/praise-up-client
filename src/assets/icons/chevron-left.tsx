import { ChevronRightEdgeSVG } from "./chevron-right-edge";

export const ChevronLeftEdgeSVG = () => {
  return (
    <div className="rotate-180">
      <ChevronRightEdgeSVG />
    </div>
  );
};
