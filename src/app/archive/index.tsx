import { Body, Composite, Engine } from "matter-js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { MarbleCanvas } from "./marble-canvas";
import { MarbleEmpty } from "./marble-empty";
import { MarbleGrid } from "./marble-grid";
import { PreviewCard } from "./preview-card";
import { PreviewSummary } from "./preview-summary";

import { MarbleModal } from "@/components/app/archive/marble-modal";
import { useApiMarbleCard } from "@/hooks/api/archive/useApiMarbleCard";
import { useApiMarbleList } from "@/hooks/api/archive/useApiMarbleList";
import { TArchiveView, TMarble, TRouteState } from "@/types/archive";
import { createMarbleObject } from "@/utils/createMarbleObject";

export const Archive = () => {
  const { state } = useLocation() as TRouteState;

  // NOTE: Server Data
  const { data: cardData } = useApiMarbleCard(state.postId);
  const { data: marbleData, refetch: refetchMarble } = useApiMarbleList(
    state.postId,
    {
      page: 0,
      size: 50,
    },
  );

  // NOTE: Marble List state
  const [marbleList, setMarbleList] = useState<TMarble[]>([]);
  const [isViewedIdList, setIsViewedIdList] = useState<number[]>([]);
  const [selectedMarbleId, setSelectedMarbleId] = useState<number>(-1);

  // NOTE: Marble Canvas state
  const [engine, setEngine] = useState<Matter.Engine>();
  const [marbleBodyList, setMarbleBodyList] = useState<Body[]>([]);

  // NOTE: Canvas, Grid View value
  const [view, setView] = useState<TArchiveView>("preview-card");

  // NOTE: Marble detail Open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const createdEngine = Engine.create({
      timing: {
        timeScale: 0.8,
      },
    });
    setEngine(createdEngine);
  }, []);

  useEffect(() => {
    if (!marbleData?.pages.length) return;

    setMarbleList(marbleData?.pages.flatMap((page) => page.content));
  }, [marbleData]);

  useEffect(() => {
    if (!marbleList.length || !!marbleBodyList.length) return;

    const marbles = updateMarbleBodyList(marbleList);
    setMarbleBodyList(marbles);
  }, [marbleList]);

  useEffect(() => {
    onChangeModalState(selectedMarbleId !== -1);
  }, [selectedMarbleId]);

  // NOTE: [DElETE] Delete marble on Canvas
  const onDeleteMarbleBody = (deleteId: number) => {
    if (!engine) return;

    const deleteMarble = engine.world.bodies.find(
      ({ id, label }) => id === deleteId && label === "marble",
    );
    if (!deleteMarble) return;
    Composite.remove(engine.world, deleteMarble);
  };

  // NOTE: [MODAL CLOSE] Add marble on Canvas
  const onCloseModal = (lastMarbleId: number) => {
    setSelectedMarbleId(-1);

    if (view !== "marble-canvas" || !engine) return;

    const lastSelectedMarble = engine.world.bodies.find(
      ({ id, label }) => id === lastMarbleId && label === "marble",
    );
    if (!lastSelectedMarble) return;

    Composite.remove(engine.world, lastSelectedMarble);
    Composite.add(
      engine.world,
      createMarbleObject({
        id: lastSelectedMarble.id,
        textContent: lastSelectedMarble.render.text?.content || "",
        isViewed: true,
      }),
    );
  };

  // NOTE: [MODAL OPEN] Set selectedMarbleId (set Modal initial index)
  const onOpenModal = (id: number) => {
    setSelectedMarbleId(id);
  };

  const onChangeView = (view: TArchiveView) => {
    setView(view);

    const marbles = updateMarbleBodyList(marbleList);
    setMarbleBodyList(marbles);
  };

  const onChangeModalState = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const onChangeSelectedMarbleId = (id: number) => {
    setSelectedMarbleId(id);
  };

  const onUpdateMarbleList = async () => {
    await refetchMarble();
  };

  const onUpdateViewIdxList = (activeIdx: number) => {
    if (activeIdx === -1 || !marbleList.length) return;

    const activeMarbleId = marbleList[activeIdx].commentId;
    const updatedIsViewedIdxList = [
      ...new Set([...isViewedIdList, activeMarbleId]),
    ];
    setIsViewedIdList(updatedIsViewedIdxList);
  };

  const updateMarbleBodyList = (marbleList: TMarble[]) => {
    return marbleList.map((marbleData) => {
      const { commentId, nickname } = marbleData;
      const isViewed =
        isViewedIdList.findIndex((marbleId) => marbleId === commentId) !== -1;

      return createMarbleObject({
        id: commentId,
        textContent: nickname,
        isViewed,
      });
    });
  };

  return (
    <>
      {isModalOpen && Boolean(selectedMarbleId !== -1) && (
        <MarbleModal
          isOpen={isModalOpen}
          selectedMarbleId={selectedMarbleId}
          marbleList={marbleList}
          onCloseModal={onCloseModal}
          onDeleteMarbleBody={onDeleteMarbleBody}
          onUpdateMarbleList={onUpdateMarbleList}
          onUpdateViewIdxList={onUpdateViewIdxList}
        />
      )}

      {view === "preview-card" && cardData && (
        <PreviewCard
          cardData={{ ...cardData, postId: state.postId }}
          onChangeView={onChangeView}
        />
      )}
      {view === "preview-summary" && (
        <>
          {marbleList.length ? (
            <PreviewSummary
              marbleNum={marbleList.length}
              onChangeView={onChangeView}
            />
          ) : (
            <MarbleEmpty onChangeView={onChangeView} />
          )}
        </>
      )}
      {view === "marble-canvas" && engine && (
        <MarbleCanvas
          engine={engine}
          marbleBodyList={marbleBodyList}
          isViewedIdList={isViewedIdList}
          onOpenModal={onOpenModal}
          onChangeView={onChangeView}
        />
      )}
      {view === "marble-grid" && (
        <MarbleGrid
          marbleList={marbleList}
          isViewedIdList={isViewedIdList}
          onChangeView={onChangeView}
          onChangeSelectedMarbleId={onChangeSelectedMarbleId}
        />
      )}
    </>
  );
};
