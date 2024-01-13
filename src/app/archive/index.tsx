import { useEffect, useState } from "react";

import { MarbleCanvas } from "./marble-canvas";
import { MarbleGrid } from "./marble-grid";
import { Preview } from "./preview";

import { ConfirmDialog } from "@/components/common/confirm/confirm-dialog";
import tempData from "@/data/archive-temp-data.json";
import { TArchiveView, TMarble } from "@/types/archive";

export const Archive = () => {
  // NOTE: Marble List state
  const [marbleList, setMarbleList] = useState<TMarble[]>([]);
  const [isViewedIdxList, setIsViewedIdxList] = useState<number[]>([]);

  // NOTE: Canvas, Grid View value
  const [view, setView] = useState<TArchiveView>("preview");

  useEffect(() => {
    // TODO: server Data
    if (!tempData.data.length) return;

    setMarbleList(tempData.data);
  }, []);

  const onChangeView = (view: TArchiveView) => {
    setView(view);
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
          isViewedIdxList={isViewedIdxList}
          onChangeView={onChangeView}
          onUpdateViewIdxList={onUpdateViewIdxList}
        />
      )}
      {view === "grid" && (
        <MarbleGrid
          marbleList={marbleList}
          isViewedIdxList={isViewedIdxList}
          onChangeView={onChangeView}
          onUpdateViewIdxList={onUpdateViewIdxList}
        />
      )}
    </ConfirmDialog>
  );
};
