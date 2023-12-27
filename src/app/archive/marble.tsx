/* eslint-disable @typescript-eslint/unbound-method */
import {
  World,
  Engine,
  Bodies,
  Events,
  Mouse,
  MouseConstraint,
  Runner,
  Body,
  IEvent,
} from "matter-js";
import { useEffect, useRef, useState } from "react";

import ballTexture from "@/assets/marble_01/marble_01_2x.webp";
import ballTexture_2 from "@/assets/marble_02/marble_02_2x.webp";
import { ASSET_WIDTH, WALL_OPTIONS } from "@/constants/archive";
import tempData from "@/data/tempData.json";
import Render from "@/lib/RenderExtension";
import { getIsMobile } from "@/utils/getIsMobile";
import { setWaitTime } from "@/utils/setWaitTime";

const Title = () => {
  return (
    <div className="relative z-10">
      <div className="absolute flex flex-col gap-0.5 text-lg text-gray-800">
        <p>해당 게시물에 대해</p>
        <p>
          <span className="font-semibold">999개</span>의 칭찬구슬이 모였어요!
        </p>
      </div>
    </div>
  );
};

export const Marble = () => {
  const [engine, setEngine] = useState<Engine>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [ballList, setBallList] = useState<Body[]>([]);
  const [selectedBall, setSelectedBall] = useState<Body>();
  const [isViewedBallList, setIsViewedBallList] = useState<number[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasScrollRef = useRef<HTMLDivElement>(null);
  const isMobile = getIsMobile();

  // TODO: height value calculate
  const width = window.innerWidth > 480 ? 480 : window.innerWidth;
  const height = window.innerHeight + window.innerHeight / 3;

  useEffect(() => {
    const createdEngine = Engine.create();
    setEngine(createdEngine);

    return () => {
      setEngine(undefined);
    };
  }, []);

  useEffect(() => {
    // TODO: server Data
    if (!tempData.data.length) return;

    const balls = tempData.data.map((ballData) => {
      return Bodies.circle(width / 2, -200, ASSET_WIDTH.ball, {
        id: ballData.id,
        label: "ball",
        restitution: 0,
        render: {
          sprite: {
            texture: ballData.id % 2 === 0 ? ballTexture : ballTexture_2,
            xScale: 0.48,
            yScale: 0.48,
          },
          text: {
            content: ballData.user,
            color: "#667080",
            size: 14,
          },
        },
      });
    });

    setBallList(balls);
  }, []);

  useEffect(() => {
    if (!engine || !ballList.length) return;

    let isScrolling = false;
    const { world } = engine;

    const render = Render.create({
      engine,
      canvas: canvasRef.current!,
      options: {
        width: width,
        height: height,
        background: "white",
        wireframes: false,
      },
    });

    const floorWall = Bodies.rectangle(
      width / 2,
      height,
      width,
      ASSET_WIDTH.wall,
      {
        ...WALL_OPTIONS,
      },
    );
    const rightWall = Bodies.rectangle(
      width,
      height / 2,
      ASSET_WIDTH.wall,
      height,
      {
        ...WALL_OPTIONS,
      },
    );
    const leftWall = Bodies.rectangle(0, height / 2, ASSET_WIDTH.wall, height, {
      ...WALL_OPTIONS,
    });

    World.add(world, [floorWall, rightWall, leftWall]);
    const runner = Runner.run(engine);

    // add mouse control
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: Mouse.create(render.canvas),
      constraint: {
        stiffness: 0,
        render: {
          visible: false,
        },
      },
    });

    // NOTE: Remove default Event
    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      mouseConstraint.mouse.mousewheel,
    );
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel,
    );
    mouseConstraint.mouse.element.removeEventListener(
      "touchstart",
      mouseConstraint.mouse.mousedown,
    );
    mouseConstraint.mouse.element.removeEventListener(
      "touchmove",
      mouseConstraint.mouse.mousemove,
    );
    mouseConstraint.mouse.element.removeEventListener(
      "touchend",
      mouseConstraint.mouse.mouseup,
    );

    // NOTE: Add custom Event
    const onMouseDown = (e: IEvent<MouseConstraint>) => {
      if (isScrolling) {
        isScrolling = false;
        return;
      }
      if (isMobile) return;

      const clickedBody = e.source.body;
      if (clickedBody && clickedBody.label === "ball") {
        setSelectedBall(clickedBody);
      }
    };

    const onTouchStart = (e: Event) => {
      mouseConstraint.mouse.mousedown(e);
    };

    const onTouchMove = () => {
      isScrolling = true;
    };

    const onTouchEnd = (e: Event) => {
      mouseConstraint.mouse.mouseup(e);

      if (isScrolling) {
        isScrolling = true;
        return;
      }

      const selectedBody = mouseConstraint.body;
      if (selectedBody && selectedBody.label === "ball") {
        setSelectedBall(selectedBody);
      }
    };

    Events.on(mouseConstraint, "mousedown", onMouseDown);
    mouseConstraint.mouse.element.addEventListener("touchstart", onTouchStart, {
      passive: true,
    });
    mouseConstraint.mouse.element.addEventListener("touchmove", onTouchMove);
    mouseConstraint.mouse.element.addEventListener("touchend", onTouchEnd);

    const compositeArr: Body[] = [];

    const spreadBall = async (ball: Body) => {
      compositeArr.push(ball);
      World.add(world, compositeArr);

      await setWaitTime(80);

      compositeArr.pop();
      World.remove(world, compositeArr);
    };

    const renderEvent = async () => {
      World.add(world, mouseConstraint);
      Render.run(render);

      for (const ball of ballList) {
        await spreadBall(ball);
      }
    };

    void renderEvent();

    return () => {
      Events.off(mouseConstraint, "mousedown", onMouseDown);
      mouseConstraint.mouse.element.removeEventListener(
        "touchstart",
        onTouchStart,
      );
      mouseConstraint.mouse.element.removeEventListener(
        "touchmove",
        onTouchMove,
      );
      mouseConstraint.mouse.element.removeEventListener("touchend", onTouchEnd);

      Runner.stop(runner);
      Render.stop(render);
      World.clear(world, true);
    };
  }, [ballList, engine, isMobile]);

  useEffect(() => {
    setIsOpen(!!selectedBall);
  }, [selectedBall]);

  useEffect(() => {
    if (!selectedBall || !engine) return;
    if (isOpen) {
      selectedBall.render.opacity = 0;
      Body.setStatic(selectedBall, true);
      Body.setPosition(selectedBall, { x: width / 2, y: -200 });
      return;
    }

    engine.world.bodies
      .filter((body) => body.label === "ball")
      .forEach((body) => {
        const isViewed =
          isViewedBallList.findIndex((ballId) => ballId === body.id) !== -1;

        if (isViewed && body.render.sprite) {
          body.render.sprite.texture = ballTexture;
        }
      });

    World.remove(engine.world, selectedBall);
    World.add(
      engine.world,
      Bodies.circle(width / 2, -200, ASSET_WIDTH.ball, {
        id: selectedBall.id,
        label: "ball",
        restitution: 0,
        render: {
          sprite: {
            texture: ballTexture,
            xScale: 0.48,
            yScale: 0.48,
          },
          text: {
            content: selectedBall.render.text?.content || "",
            color: "#667080",
            size: 14,
          },
        },
      }),
    );
    setSelectedBall(undefined);
  }, [isOpen]);

  return (
    <div>
      <Title />
      <canvas ref={canvasRef} className="absolute left-0" />
    </div>
  );
};
