import { Bodies } from "matter-js";

import { ASSET_WIDTH, WIDTH } from "@/constants/archive";
import { TMarbleObject } from "@/types/archive";

export const createMarbleObject = ({
  id,
  texture,
  textContent,
  isViewed = false,
}: TMarbleObject) => {
  return Bodies.circle(WIDTH / 2, -200, ASSET_WIDTH.marble, {
    id,
    label: "marble",
    restitution: 0,
    render: {
      sprite: {
        texture,
        xScale: 0.48,
        yScale: 0.48,
      },
      text: {
        content: textContent,
        color: isViewed ? "#a1a9b2" : "#667080",
        size: 14,
      },
    },
  });
};
