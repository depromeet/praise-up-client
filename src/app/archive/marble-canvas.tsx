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
  Query,
} from "matter-js";
import { useEffect, useRef, useState } from "react";

import Bars from "@/assets/icons/bars.svg";
import marbleIsViewedTexture from "@/assets/images/marble_01/marble-01-isViewed-2x.webp";
import marbleIsViewedTexture_2 from "@/assets/images/marble_02/marble-02-isViewed-2x.webp";
import { ArchiveTitle } from "@/components/app/archive/archive-title";
import { FABButton } from "@/components/app/archive/fab-button";
import { ASSET_WIDTH, HEIGHT, WALL_OPTIONS, WIDTH } from "@/constants/archive";
import Render from "@/lib/RenderExtension";
import { TArchiveView, TMarble } from "@/types/archive";
import { createMarbleObject } from "@/utils/createMarbleObject";
import { getIsMobile } from "@/utils/getIsMobile";
import { setWaitTime } from "@/utils/setWaitTime";

type Props = {
  marbleList: TMarble[];
  marbleBodyList: Body[];
  selectedMarbleId: number;
  isViewedIdxList: number[];
  isModalOpen: boolean;
  onChangeView: (view: TArchiveView) => void;
  onChangeSelectedMarbleId: (id: number) => void;
};

export const MarbleCanvas = ({
  marbleList,
  marbleBodyList,
  selectedMarbleId,
  isViewedIdxList,
  isModalOpen,
  onChangeView,
  onChangeSelectedMarbleId,
}: Props) => {
  const [engine, setEngine] = useState<Engine>();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasScrollRef = useRef<HTMLDivElement>(null);
  const isMobile = getIsMobile();

  useEffect(() => {
    const createdEngine = Engine.create();
    setEngine(createdEngine);
  }, []);

  useEffect(() => {
    if (!engine || !marbleList.length) return;

    const render = Render.create({
      engine,
      canvas: canvasRef.current!,
      options: {
        width: WIDTH,
        height: HEIGHT,
        background: "white",
        wireframes: false,
      },
    });
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
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
      Mouse.clearSourceEvents(mouse);
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
      Events.on(mouseConstraint, "mouseup", onMouseUp);
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
      Events.off(mouseConstraint, "mouseup", onMouseUp);
    };

    // Event Handler
    const onMouseUp = (e: IEvent<MouseConstraint>) => {
      const { x, y } = e.mouse.mouseupPosition;
      const bodiesUnderMouse = Query.point(engine.world.bodies, { x, y });

      const selectedBody = bodiesUnderMouse[0];
      if (selectedBody && selectedBody.label === "marble") {
        onChangeSelectedMarbleId(selectedBody.id);
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
        onChangeSelectedMarbleId(selectedBody.id);
      }
    };

    // NOTE: Setup functions
    const setupWallsObject = () => {
      const floor = Bodies.rectangle(
        WIDTH / 2,
        HEIGHT,
        WIDTH,
        ASSET_WIDTH.wall,
        {
          ...WALL_OPTIONS,
        },
      );
      const right = Bodies.rectangle(
        WIDTH,
        HEIGHT / 2,
        ASSET_WIDTH.wall,
        HEIGHT,
        {
          ...WALL_OPTIONS,
        },
      );
      const left = Bodies.rectangle(0, HEIGHT / 2, ASSET_WIDTH.wall, HEIGHT, {
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

      for (const marble of marbleBodyList) {
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
    if (!engine || selectedMarbleId === -1) return;

    const selectedMarble = marbleBodyList.find(
      ({ id }) => id === selectedMarbleId,
    );
    if (!selectedMarble) return;

    if (isModalOpen) {
      selectedMarble.render.opacity = 0;
      Body.setStatic(selectedMarble, true);
      Body.setPosition(selectedMarble, { x: WIDTH / 2, y: -200 });
      return;
    }

    engine.world.bodies
      .filter((body) => body.label === "marble")
      .forEach((body) => {
        const isViewed =
          isViewedIdxList.findIndex((marbleId) => marbleId === body.id) !== -1;

        if (isViewed && body.render.sprite && body.render.text) {
          body.render.sprite.texture =
            body.id % 2 === 0 ? marbleIsViewedTexture : marbleIsViewedTexture_2;
          body.render.text.color = "#a1a9b2";
        }
      });

    World.remove(engine.world, selectedMarble);
    World.add(
      engine.world,
      createMarbleObject({
        id: selectedMarble.id,
        texture:
          selectedMarble.id % 2 === 0
            ? marbleIsViewedTexture
            : marbleIsViewedTexture_2,
        textContent: selectedMarble.render.text?.content || "",
        isViewed: true,
      }),
    );

    onChangeSelectedMarbleId(-1);
  }, [isModalOpen]);

  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div className="h-16">Temp Header</div>

      <div ref={canvasScrollRef} className="h-screen overflow-scroll">
        <ArchiveTitle archiveMarbleNum={marbleList.length} isLayout={true} />
        <canvas ref={canvasRef} />
      </div>

      <FABButton
        icon={Bars}
        text="리스트뷰"
        onClick={() => onChangeView("grid")}
        scrollRef={canvasScrollRef}
      />
    </div>
  );
};
