import { Body } from "matter-js";
import { useEffect, useState } from "react";

import { MarbleCanvas } from "./marble-canvas";
import { MarbleGrid } from "./marble-grid";
import { Preview } from "./preview";

import marbleTexture from "@/assets/images/marble_01/marble-01-2x.webp";
import marbleIsViewedTexture from "@/assets/images/marble_01/marble-01-isViewed-2x.webp";
import marbleTexture_2 from "@/assets/images/marble_02/marble-02-2x.webp";
import marbleIsViewedTexture_2 from "@/assets/images/marble_02/marble-02-isViewed-2x.webp";
import { MarbleModal } from "@/components/app/archive/marble-modal";
import { ConfirmDialog } from "@/components/common/confirm/confirm-dialog";
import { useApiMarbleList } from "@/hooks/api/archive/useApiMarbleList";
import { TArchiveView, TMarble } from "@/types/archive";
import { createMarbleObject } from "@/utils/createMarbleObject";

export const Archive = () => {
  // NOTE: Marble List state
  const [marbleList, setMarbleList] = useState<TMarble[]>([]);
  const [marbleBodyList, setMarbleBodyList] = useState<Body[]>([]);
  const [selectedMarbleId, setSelectedMarbleId] = useState<number>(-1);

  const [isViewedIdList, setIsViewedIdList] = useState<number[]>([]);
  const { data } = useApiMarbleList(1, { page: 0, size: 24 });

  // NOTE: Canvas, Grid View value
  const [view, setView] = useState<TArchiveView>("preview");

  // NOTE: Marble detail Open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!data?.pages.length) return;

    setMarbleList(data?.pages.flatMap((page) => page.content));
  }, [data]);

  useEffect(() => {
    if (!marbleList.length) return;

    const marbles = marbleList.map((marbleData) => {
      const { commentId, nickname } = marbleData;
      const texture = commentId % 2 === 0 ? marbleTexture : marbleTexture_2;
      return createMarbleObject({
        id: commentId,
        texture,
        textContent: nickname,
      });
    });

    setMarbleBodyList(marbles);
  }, [marbleList]);

  useEffect(() => {
    onChangeModalState(selectedMarbleId !== -1);
  }, [selectedMarbleId]);

  const onChangeView = (view: TArchiveView) => {
    setView(view);
  };

  const onChangeModalState = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const onChangeSelectedMarbleId = (id: number) => {
    setSelectedMarbleId(id);
  };

  const onUpdateMarbleBodyList = (id: number) => {
    const marbleItem = marbleBodyList.find((marble) => marble.id === id);
    if (!marbleItem) return;

    const filteredMarbleList = marbleBodyList.filter(
      (body) => body.id !== marbleItem.id,
    );
    setMarbleBodyList([
      ...filteredMarbleList,
      createMarbleObject({
        id,
        texture: id % 2 === 0 ? marbleIsViewedTexture : marbleIsViewedTexture_2,
        textContent: marbleItem.render.text?.content || "",
        isViewed: true,
      }),
    ]);
  };

  const onUpdateViewIdxList = (activeIdx: number) => {
    if (activeIdx === -1 || !marbleList.length) return;

    const activeMarbleId = marbleList[activeIdx].commentId;
    const updatedIsViewedIdxList = [
      ...new Set([...isViewedIdList, activeMarbleId]),
    ];
    setIsViewedIdList(updatedIsViewedIdxList);
  };

  if (!marbleList.length) return null;
  return (
    <ConfirmDialog>
      {isModalOpen && Boolean(selectedMarbleId !== -1) && (
        <MarbleModal
          isOpen={isModalOpen}
          selectedMarbleId={selectedMarbleId}
          marbleList={marbleList}
          onChangeOpenState={onChangeModalState}
          onUpdateViewIdxList={onUpdateViewIdxList}
        />
      )}

      {view === "preview" && <Preview onChangeView={onChangeView} />}
      {view === "canvas" && (
        <MarbleCanvas
          marbleBodyList={marbleBodyList}
          selectedMarbleId={selectedMarbleId}
          isViewedIdList={isViewedIdList}
          isModalOpen={isModalOpen}
          onChangeView={onChangeView}
          onChangeSelectedMarbleId={onChangeSelectedMarbleId}
          onUpdateMarbleBodyList={onUpdateMarbleBodyList}
        />
      )}
      {view === "grid" && (
        <MarbleGrid
          marbleList={marbleList}
          isViewedIdList={isViewedIdList}
          onChangeView={onChangeView}
          onChangeSelectedMarbleId={onChangeSelectedMarbleId}
        />
      )}
    </ConfirmDialog>
  );
};
