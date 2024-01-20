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
import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left.tsx";
import marbleIsViewedTexture from "@/assets/images/marble_01/marble-01-isViewed-2x.webp";
import marbleIsViewedTexture_2 from "@/assets/images/marble_02/marble-02-isViewed-2x.webp";
import { FABButton } from "@/components/app/archive/fab-button";
import { Appbar } from "@/components/common/appbar";
import { Header } from "@/components/common/header";
import { ASSET_WIDTH, WIDTH } from "@/constants/archive";
import Render from "@/lib/RenderExtension";
import { TArchiveView, TMarble } from "@/types/archive";
import { createMarbleObject } from "@/utils/createMarbleObject";
import { setWaitTime } from "@/utils/setWaitTime";

type Props = {
  marbleList: TMarble[];
  selectedMarbleId: number;
  isViewedIdList: number[];
  isModalOpen: boolean;
  onChangeView: (view: TArchiveView) => void;
  onChangeSelectedMarbleId: (id: number) => void;
};

export const MarbleCanvas = ({
  marbleList,
  selectedMarbleId,
  isViewedIdList,
  isModalOpen,
  onChangeView,
  onChangeSelectedMarbleId,
}: Props) => {
  const [engine, setEngine] = useState<Engine>();
  const [marbleBodyList, setMarbleBodyList] = useState<Body[]>([]);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 에러 발생으로 임시 수정
  const top = Bodies.rectangle(WIDTH / 2, -300, WIDTH, ASSET_WIDTH.wall, {
    isStatic: true,
    render: {
      fillStyle: "white",
    },
  });
  const floor = Bodies.rectangle(
    WIDTH / 2,
    canvasHeight,
    WIDTH,
    ASSET_WIDTH.wall,
    {
      isStatic: true,
      render: {
        fillStyle: "white",
      },
    },
  );
  const right = Bodies.rectangle(
    WIDTH,
    canvasHeight / 2 - 300,
    ASSET_WIDTH.wall,
    canvasHeight + 600,
    {
      isStatic: true,
      render: {
        fillStyle: "white",
      },
    },
  );
  const left = Bodies.rectangle(
    0,
    canvasHeight / 2 - 300,
    ASSET_WIDTH.wall,
    canvasHeight + 600,
    {
      isStatic: true,
      render: {
        fillStyle: "white",
      },
    },
  );

  useEffect(() => {
    const createdEngine = Engine.create();
    setEngine(createdEngine);
  }, []);

  // NOTE ===== Create Marble Body Object
  useEffect(() => {
    if (!marbleList.length) return;

    const marbles = marbleList.map((marbleData) => {
      const { commentId, nickname } = marbleData;
      const isViewed =
        isViewedIdList.findIndex((marbleId) => marbleId === commentId) !== -1;

      return createMarbleObject({
        id: commentId,
        textContent: nickname,
        isViewed,
      });
    });

    setCanvasHeight(getCanvasHeight(marbleList.length, WIDTH));
    setMarbleBodyList(marbles);
  }, [marbleList]);

  // NOTE ===== Canvas Setting + Rendering Marble Object
  useEffect(() => {
    if (!engine || !marbleList.length || !canvasHeight) return;

    const render = Render.create({
      engine,
      canvas: canvasRef.current!,
      options: {
        width: WIDTH,
        height: canvasHeight,
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
      World.add(world, [top, floor, right, left]);
    };

    const setupMouseConstraint = () => {
      removeDefaultEvent();
      addCustomEvent();

      World.add(world, mouseConstraint);
    };

    // NOTE: Rendering functions
    const renderMarbleObject = async (marble: Body) => {
      World.add(world, marble);

      await setWaitTime(100);
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
  }, [marbleList, engine]);

  // NOTE ===== Modal openState에 따라 selectedMarble hide / render
  useEffect(() => {
    if (!engine || selectedMarbleId === -1) return;

    const selectedMarble = engine.world.bodies.find(
      ({ id }) => id === selectedMarbleId,
    );
    if (!selectedMarble) return;

    if (isModalOpen) {
      selectedMarble.render.opacity = 0;
      Body.setStatic(selectedMarble, true);
      Body.setPosition(selectedMarble, { x: WIDTH / 2, y: 50 });
      return;
    }

    World.remove(engine.world, selectedMarble);
    World.add(
      engine.world,
      createMarbleObject({
        id: selectedMarble.id,
        textContent: selectedMarble.render.text?.content || "",
        isViewed: true,
      }),
    );

    onChangeSelectedMarbleId(-1);
  }, [engine, isModalOpen]);

  // NOTE ===== isViewedList 업데이트에 따라 marble 색상 변경
  useEffect(() => {
    if (!engine) return;

    const worldMarbleList = engine.world.bodies.filter(
      ({ label }) => label === "marble",
    );
    worldMarbleList.forEach((marble) => {
      const isViewed =
        isViewedIdList.findIndex((marbleId) => marbleId === marble.id) !== -1;

      if (isViewed && marble.render.sprite && marble.render.text) {
        marble.render.sprite.texture =
          marble.id % 2 === 0 ? marbleIsViewedTexture : marbleIsViewedTexture_2;
        marble.render.text.color = "#a1a9b2";
      }
    });
  }, [engine, isViewedIdList]);

  const getCanvasHeight = (marbleNum: number, width: number) => {
    if (!window.visualViewport) return 0;

    // margin = text top + textHeight + 최소 구슬 마진
    const margin = 80 + 48 + 112;
    const curHeight = window.visualViewport.height;
    const minHeight =
      Math.ceil(marbleNum / ((width - 40) / (ASSET_WIDTH.marble * 2))) *
      ASSET_WIDTH.marble *
      2;

    return minHeight > curHeight - margin ? margin + minHeight : curHeight;
  };

  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div className="relative z-20">
        {/* 스크롤 시 bg-transparent 변경 */}
        <div className="fixed top-0 w-full bg-white">
          <Appbar
            left={
              <button onClick={() => onChangeView("preview-card")}>
                <ChevronLeftEdgeSVG />
              </button>
            }
          />
        </div>
      </div>

      <div className="relative z-10">
        <Header
          text="보고싶은 칭찬 구슬을 눌러\n칭찬을 확인해보세요!"
          className="absolute left-5 top-20 !w-fit animate-fadeInUp"
        />
      </div>

      <canvas className="absolute top-0" ref={canvasRef} />

      <FABButton
        icon={Bars}
        text="리스트뷰"
        onClick={() => onChangeView("marble-grid")}
      />
    </div>
  );
};
