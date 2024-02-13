/* eslint-disable @typescript-eslint/unbound-method */
// eslint-disable-next-line import/default
import clsx from "clsx";
import {
  Body,
  Engine,
  IEvent,
  World,
  Bodies,
  Events,
  Mouse,
  MouseConstraint,
  Runner,
  Query,
  Composite,
} from "matter-js";
import { Fragment, useEffect, useRef, useState } from "react";

import Bars from "@/assets/icons/bars.svg";
import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left.tsx";
import marbleIsViewedTexture from "@/assets/images/marble_01/marble-01-isViewed-2x.webp";
import marbleIsViewedTexture_2 from "@/assets/images/marble_02/marble-02-isViewed-2x.webp";
import { FABButton } from "@/components/app/archive/fab-button";
import { Appbar } from "@/components/common/appbar";
import { Header } from "@/components/common/header";
import { ASSET_WIDTH, WIDTH } from "@/constants/archive";
import { UseScrollToTop } from "@/hooks/useScrollToTop";
import { useWindowScrollY } from "@/hooks/useWindowScrollY";
import Render from "@/lib/RenderExtension";
import { TArchiveView } from "@/types/archive";
import { setWaitTime } from "@/utils/setWaitTime";

type Props = {
  engine: Engine;
  marbleBodyList: Body[];
  isViewedIdList: number[];
  onOpenModal: (id: number) => void;
  onChangeView: (view: TArchiveView) => void;
};

export const MarbleCanvas = ({
  engine,
  marbleBodyList,
  isViewedIdList,
  onOpenModal,
  onChangeView,
}: Props) => {
  UseScrollToTop();
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isOverflow } = useWindowScrollY({ point: 1 });

  // NOTE ===== Create Marble Body Object
  useEffect(() => {
    if (!marbleBodyList.length) return;

    setCanvasHeight(getCanvasHeight(marbleBodyList.length, WIDTH));
  }, [marbleBodyList]);

  // NOTE ===== Canvas Setting + Rendering Marble Object
  useEffect(() => {
    if (!engine || !marbleBodyList.length || !canvasHeight) return;

    const canvasRender = Render.create({
      engine,
      canvas: canvasRef.current!,
      options: {
        width: WIDTH,
        height: canvasHeight,
        background: "white",
        wireframes: false,
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
    const onMouseUp = (e: IEvent<Matter.MouseConstraint>) => {
      if (isScrolling) {
        isScrolling = false;
        return;
      }

      const { x, y } = e.mouse.mouseupPosition;
      const bodiesUnderMouse = Query.point(engine.world.bodies, { x, y });

      const selectedBody = bodiesUnderMouse[0];
      if (selectedBody && selectedBody.label === "marble") {
        onOpenModal(selectedBody.id);
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

      // NOTE: mouseUp event 사용으로 주석처리
      // if (isScrolling) {
      //   isScrolling = false;
      //   return;
      // }

      // const selectedBody = mouseConstraint.body;
      // if (selectedBody && selectedBody.label === "marble") {
      //   onOpenModal(selectedBody.id);
      // }
    };

    // NOTE: Setup functions
    const setupWallsObject = () => {
      // 에러 발생으로 임시 수정
      const top = Bodies.rectangle(
        WIDTH / 2,
        -400,
        WIDTH + 60,
        ASSET_WIDTH.wall,
        {
          isStatic: true,
          render: {
            fillStyle: "white",
          },
        },
      );
      const floor = Bodies.rectangle(
        WIDTH / 2,
        canvasHeight + ASSET_WIDTH.wall - 70,
        WIDTH + 60,
        ASSET_WIDTH.wall,
        {
          isStatic: true,
          render: {
            fillStyle: "white",
          },
        },
      );
      const right = Bodies.rectangle(
        WIDTH + 35,
        canvasHeight / 2 - 300,
        ASSET_WIDTH.wall,
        canvasHeight * 2,
        {
          isStatic: true,
          render: {
            fillStyle: "white",
          },
        },
      );
      const left = Bodies.rectangle(
        -35,
        canvasHeight / 2 - 300,
        ASSET_WIDTH.wall,
        canvasHeight * 2,
        {
          isStatic: true,
          render: {
            fillStyle: "white",
          },
        },
      );
      Composite.add(world, [top, floor, right, left]);
    };

    const mouse = Mouse.create(canvasRender.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0,
        render: {
          visible: false,
        },
      },
    });

    const setupMouseConstraint = () => {
      removeDefaultEvent();
      addCustomEvent();

      Composite.add(world, mouseConstraint);
    };

    // NOTE: Rendering functions
    const renderMarbleObject = async (marble: Matter.Body) => {
      Composite.add(world, marble);

      await setWaitTime(100);
    };

    const renderEvent = async () => {
      setupWallsObject();
      setupMouseConstraint();

      Render.run(canvasRender);

      for (const marble of marbleBodyList) {
        await renderMarbleObject(marble);
      }
    };

    const canvasRunner = Runner.run(engine);
    void renderEvent();

    // NOTE: Initialize of Canvas
    return () => {
      removeCustomEvent();

      Runner.stop(canvasRunner);
      Render.stop(canvasRender);
      World.clear(world, false);
      Engine.clear(engine);
    };
  }, [marbleBodyList, engine, canvasHeight]);

  // NOTE ===== isViewedList 업데이트에 따라 marble 색상 변경
  useEffect(() => {
    if (!engine || !isViewedIdList.length) return;

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
        <div className="fixed top-0 w-full">
          <Appbar
            left={
              <button onClick={() => onChangeView("preview-card")}>
                <ChevronLeftEdgeSVG />
              </button>
            }
            content={
              <div
                className={clsx(
                  isOverflow ? "opacity-100" : "opacity-0",
                  "font-semibold text-primary transition-all",
                )}
              >
                {marbleBodyList.length}개의 칭찬구슬
              </div>
            }
            right={<Fragment />}
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
