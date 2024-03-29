// eslint-disable-next-line import/default
import Matter from "matter-js";

import marbleTexture from "@/assets/images/marble_01/marble-01-2x.webp";
import marbleIsViewedTexture from "@/assets/images/marble_01/marble-01-isViewed-2x.webp";
import marbleTexture_2 from "@/assets/images/marble_02/marble-02-2x.webp";
import marbleIsViewedTexture_2 from "@/assets/images/marble_02/marble-02-isViewed-2x.webp";
import { ASSET_WIDTH, WIDTH } from "@/constants/archive";
import { TMarbleObject } from "@/types/archive";

export const createMarbleObject = ({
  id,
  textContent,
  isViewed = false,
}: TMarbleObject) => {
  const { Bodies } = Matter;

  const isFirstType = id % 2 === 0;
  const isNotViewedTexture = isFirstType ? marbleTexture : marbleTexture_2;
  const isViewedTexture = isFirstType
    ? marbleIsViewedTexture
    : marbleIsViewedTexture_2;

  return Bodies.circle(WIDTH / 2, -200, ASSET_WIDTH.marble, {
    id,
    label: "marble",
    restitution: 0,
    friction: 1,
    render: {
      sprite: {
        texture: isViewed ? isViewedTexture : isNotViewedTexture,
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
