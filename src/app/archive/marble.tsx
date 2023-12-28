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

import marbleTexture from "@/assets/marble_01/marble_01_2x.webp";
import marbleTexture_2 from "@/assets/marble_02/marble_02_2x.webp";
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
  const [marbleList, setMarbleList] = useState<Body[]>([]);
  const [selectedMarble, setSelectedMarble] = useState<Body>();
  const [isViewedMarbleList, setIsViewedMarbleList] = useState<number[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasScrollRef = useRef<HTMLDivElement>(null);
  const isMobile = getIsMobile();

  // TODO: height value calculate
  const width = window.innerWidth > 480 ? 480 : window.innerWidth;
  const height = window.innerHeight + window.innerHeight / 3;

  useEffect(() => {
    const createdEngine = Engine.create();
    setEngine(createdEngine);
  }, []);

  useEffect(() => {
    // TODO: server Data
    if (!tempData.data.length) return;

    const marbles = tempData.data.map((marbleData) => {
      return Bodies.circle(width / 2, -200, ASSET_WIDTH.marble, {
        id: marbleData.id,
        label: "marble",
        restitution: 0,
        render: {
          sprite: {
            texture: marbleData.id % 2 === 0 ? marbleTexture : marbleTexture_2,
            xScale: 0.48,
            yScale: 0.48,
          },
          text: {
            content: marbleData.user,
            color: "#667080",
            size: 14,
          },
        },
      });
    });

    setMarbleList(marbles);
  }, []);

  useEffect(() => {
    if (!engine || !marbleList.length) return;

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
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: Mouse.create(render.canvas),
      constraint: {
        stiffness: 0,
        render: {
          visible: false,
        },
      },
    });
    const { world } = engine;
    const compositeArr: Body[] = [];
    let isScrolling = false;

    // NOTE: Remove default Event
    const removeDefaultEvent = () => {
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
    };

    // NOTE: Add custom Event
    const addCustomEvent = () => {
      mouseConstraint.mouse.element.addEventListener(
        "touchstart",
        onTouchStart,
        {
          passive: true,
        },
      );
      mouseConstraint.mouse.element.addEventListener("touchmove", onTouchMove);
      mouseConstraint.mouse.element.addEventListener("touchend", onTouchEnd);
      Events.on(mouseConstraint, "mousedown", onMouseDown);
    };

    // NOTE: Remove custom Event
    const removeCustomEvent = () => {
      mouseConstraint.mouse.element.removeEventListener(
        "touchstart",
        onTouchStart,
      );
      mouseConstraint.mouse.element.removeEventListener(
        "touchmove",
        onTouchMove,
      );
      mouseConstraint.mouse.element.removeEventListener("touchend", onTouchEnd);
      Events.off(mouseConstraint, "mousedown", onMouseDown);
    };

    // Event handlers
    const onMouseDown = (e: IEvent<MouseConstraint>) => {
      if (isScrolling) {
        isScrolling = false;
        return;
      }
      if (isMobile) return;

      const clickedBody = e.source.body;
      if (clickedBody && clickedBody.label === "marble") {
        setSelectedMarble(clickedBody);
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
      if (selectedBody && selectedBody.label === "marble") {
        setSelectedMarble(selectedBody);
      }
    };

    // NOTE: Setup functions
    const setupWallsObject = () => {
      const floor = Bodies.rectangle(
        width / 2,
        height,
        width,
        ASSET_WIDTH.wall,
        {
          ...WALL_OPTIONS,
        },
      );
      const right = Bodies.rectangle(
        width,
        height / 2,
        ASSET_WIDTH.wall,
        height,
        {
          ...WALL_OPTIONS,
        },
      );
      const left = Bodies.rectangle(0, height / 2, ASSET_WIDTH.wall, height, {
        ...WALL_OPTIONS,
      });

      World.add(world, [floor, right, left]);
    };

    const setupMouseConstraint = () => {
      removeDefaultEvent();
      addCustomEvent();

      World.add(world, mouseConstraint);
    };

    // NOTE: Rendering functions
    const renderMarbleObject = async (marble: Body) => {
      compositeArr.push(marble);
      World.add(world, compositeArr);

      await setWaitTime(80);

      compositeArr.pop();
      World.remove(world, compositeArr);
    };

    const renderEvent = async () => {
      setupWallsObject();
      setupMouseConstraint();

      Render.run(render);

      for (const marble of marbleList) {
        await renderMarbleObject(marble);
      }
    };

    const runner = Runner.run(engine);
    void renderEvent();

    // NOTE: Initialize of Canvas
    return () => {
      removeCustomEvent();

      Runner.stop(runner);
      Render.stop(render);
      World.clear(world, false);
      Engine.clear(engine);
    };
  }, [marbleList, engine, isMobile]);

  useEffect(() => {
    setIsOpen(!!selectedMarble);
  }, [selectedMarble]);

  useEffect(() => {
    if (!selectedMarble || !engine) return;

    if (isOpen) {
      selectedMarble.render.opacity = 0;
      Body.setStatic(selectedMarble, true);
      Body.setPosition(selectedMarble, { x: width / 2, y: -200 });
      return;
    }

    engine.world.bodies
      .filter((body) => body.label === "marble")
      .forEach((body) => {
        const isViewed =
          isViewedMarbleList.findIndex((marbleId) => marbleId === body.id) !==
          -1;

        if (isViewed && body.render.sprite) {
          body.render.sprite.texture = marbleTexture;
        }
      });

    World.remove(engine.world, selectedMarble);
    World.add(
      engine.world,
      Bodies.circle(width / 2, -200, ASSET_WIDTH.marble, {
        id: selectedMarble.id,
        label: "marble",
        restitution: 0,
        render: {
          sprite: {
            texture: marbleTexture,
            xScale: 0.48,
            yScale: 0.48,
          },
          text: {
            content: selectedMarble.render.text?.content || "",
            color: "#667080",
            size: 14,
          },
        },
      }),
    );
    setSelectedMarble(undefined);
  }, [isOpen]);

  return (
    <div>
      <Title />
      <canvas ref={canvasRef} className="absolute left-0" />
    </div>
  );
};
