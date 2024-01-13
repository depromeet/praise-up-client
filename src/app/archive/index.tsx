import { Body } from "matter-js";
import { useEffect, useState } from "react";

import { MarbleCanvas } from "./marble-canvas";
import { MarbleGrid } from "./marble-grid";
import { Preview } from "./preview";

import marbleTexture from "@/assets/images/marble_01/marble-01-2x.webp";
import marbleTexture_2 from "@/assets/images/marble_02/marble-02-2x.webp";
import { ConfirmDialog } from "@/components/common/confirm/confirm-dialog";
import tempData from "@/data/archive-temp-data.json";
import { TArchiveView, TMarble } from "@/types/archive";
import { createMarbleObject } from "@/utils/createMarbleObject";

export const Archive = () => {
  // NOTE: Marble List state
  const [marbleList, setMarbleList] = useState<TMarble[]>([]);
  const [marbleBodyList, setMarbleBodyList] = useState<Body[]>([]);
  const [selectedMarble, setSelectedMarble] = useState<Body>();

  const [isViewedIdxList, setIsViewedIdxList] = useState<number[]>([]);

  // NOTE: Canvas, Grid View value
  const [view, setView] = useState<TArchiveView>("preview");

  // NOTE: Marble detail Open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // TODO: server Data
    if (!tempData.data.length) return;

    setMarbleList(tempData.data);
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

  const onChangeView = (view: TArchiveView) => {
    setView(view);
  };

  const onChangeModalState = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const onChangeSelectedMarble = (selectedMarble?: Body) => {
    setSelectedMarble(selectedMarble);
  };

  const onUpdateViewIdxList = (activeIdx: number) => {
    if (activeIdx === -1 || !marbleList.length) return;

    const activeMarbleId = marbleList[activeIdx].id;
    const updatedIsViewedIdxList = [
      ...new Set([...isViewedIdxList, activeMarbleId]),
    ];
    setIsViewedIdxList(updatedIsViewedIdxList);
  };

  if (!marbleList.length) return null;
  return (
    <ConfirmDialog>
      {view === "preview" && <Preview onChangeView={onChangeView} />}
      {view === "canvas" && (
        <MarbleCanvas
          marbleList={marbleList}
          marbleBodyList={marbleBodyList}
          selectedMarble={selectedMarble}
          isViewedIdxList={isViewedIdxList}
          isModalOpen={isModalOpen}
          onChangeView={onChangeView}
          onUpdateViewIdxList={onUpdateViewIdxList}
          onChangeModalState={onChangeModalState}
          onChangeSelectedMarble={onChangeSelectedMarble}
        />
      )}
      {view === "grid" && (
        <MarbleGrid
          marbleList={marbleList}
          isViewedIdxList={isViewedIdxList}
          onChangeView={onChangeView}
          onUpdateViewIdxList={onUpdateViewIdxList}
          onChangeModalState={onChangeModalState}
        />
      )}
    </ConfirmDialog>
  );
};
