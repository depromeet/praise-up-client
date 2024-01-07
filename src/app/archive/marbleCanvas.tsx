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
import marbleTexture from "@/assets/images/marble_01/marble_01_2x.webp";
import marbleIsViewedTexture from "@/assets/images/marble_01/marble_01_isViewed_2x.webp";
import marbleTexture_2 from "@/assets/images/marble_02/marble_02_2x.webp";
import marbleIsViewedTexture_2 from "@/assets/images/marble_02/marble_02_isViewed_2x.webp";
import { ArchiveTitle } from "@/components/app/archive/archiveTitle";
import { FABButton } from "@/components/app/archive/fabButton";
import { MarbleModal } from "@/components/app/archive/marbleModal";
import { ASSET_WIDTH, WALL_OPTIONS } from "@/constants/archive";
import Render from "@/lib/RenderExtension";
import { TMarble } from "@/types/archive";
import { getIsMobile } from "@/utils/getIsMobile";
import { setWaitTime } from "@/utils/setWaitTime";

interface IMarbleObject {
  id: number;
  texture: string;
  textContent: string;
  isViewed?: boolean;
}

type Props = {
  marbleList: TMarble[];
};

export const MarbleCanvas = ({ marbleList }: Props) => {
  const [engine, setEngine] = useState<Engine>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [marbleBodyList, setMarbleBodyList] = useState<Body[]>([]);
  const [selectedMarble, setSelectedMarble] = useState<Body>();
  const [isViewedMarbleList, setIsViewedMarbleList] = useState<number[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasScrollRef = useRef<HTMLDivElement>(null);
  const isMobile = getIsMobile();

  // TODO: height value calculate (visualViewport)
  const width = window.innerWidth > 480 ? 480 : window.innerWidth;
  const height = window.innerHeight + window.innerHeight / 3;

  useEffect(() => {
    const createdEngine = Engine.create();
    setEngine(createdEngine);
  }, []);

  useEffect(() => {
    if (!marbleList.length) return;

    const marbles = marbleList.map((marbleData) => {
      const { id, user: textContent } = marbleData;
      const texture = marbleData.id % 2 === 0 ? marbleTexture : marbleTexture_2;
      return createMarbleObject({ id, texture, textContent });
    });

    setMarbleBodyList(marbles);
  }, [marbleList]);

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
        setSelectedMarble(selectedBody);
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
    setSelectedMarble(undefined);
  }, [isOpen]);

  const createMarbleObject = ({
    id,
    texture,
    textContent,
    isViewed = false,
  }: IMarbleObject) => {
    return Bodies.circle(width / 2, -200, ASSET_WIDTH.marble, {
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

  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div className="h-16">Temp Header</div>
      {isOpen && selectedMarble && (
        <MarbleModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedMarble={selectedMarble}
          marbleList={marbleBodyList}
          isViewedMarbleList={isViewedMarbleList}
          setIsViewedMarbleList={setIsViewedMarbleList}
        />
      )}
      <div ref={canvasScrollRef} className="h-screen overflow-scroll">
        <ArchiveTitle archiveMarbleNum={marbleList.length} isLayout={true} />
        <canvas ref={canvasRef} />
      </div>
      <FABButton icon={Bars} text="리스트뷰" scrollRef={canvasScrollRef} />
    </div>
  );
};
