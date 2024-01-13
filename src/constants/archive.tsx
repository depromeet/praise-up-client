export const ASSET_WIDTH = {
  wall: 10,
  marble: 50,
};

export const WALL_OPTIONS = {
  isStatic: true,
  render: {
    fillStyle: "white",
  },
};

// TODO: height value calculate (visualViewport)
export const WIDTH = window.innerWidth > 480 ? 480 : window.innerWidth;
export const HEIGHT = window.innerHeight + window.innerHeight / 3;
