import { useEffect, useState } from "react";

import { MarbleCanvas } from "./marble-canvas";
import { MarbleGrid } from "./marble-grid";
import { PreviewCard } from "./preview-card";
import { PreviewSummary } from "./preview-summary";

import { MarbleModal } from "@/components/app/archive/marble-modal";
import { ConfirmDialog } from "@/components/common/confirm/confirm-dialog";
import { useApiMarbleList } from "@/hooks/api/archive/useApiMarbleList";
import { TArchiveView, TMarble } from "@/types/archive";

export const Archive = () => {
  // NOTE: Server Data
  const { data, refetch } = useApiMarbleList(1, { page: 0, size: 24 });

  // NOTE: Marble List state
  const [marbleList, setMarbleList] = useState<TMarble[]>([]);
  const [isViewedIdList, setIsViewedIdList] = useState<number[]>([]);
  const [selectedMarbleId, setSelectedMarbleId] = useState<number>(-1);

  // NOTE: Canvas, Grid View value
  const [view, setView] = useState<TArchiveView>("preview-card");

  // NOTE: Marble detail Open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!data?.pages.length) return;

    setMarbleList(data?.pages.flatMap((page) => page.content));
  }, [data]);

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

  const onUpdateMarbleList = async () => {
    await refetch();
  };

  const onUpdateViewIdxList = (activeIdx: number) => {
    if (activeIdx === -1 || !marbleList.length) return;

    const activeMarbleId = marbleList[activeIdx].commentId;
    const updatedIsViewedIdxList = [
      ...new Set([...isViewedIdList, activeMarbleId]),
    ];
    setIsViewedIdList(updatedIsViewedIdxList);
  };

  // TODO: Marble 스와이프 후 삭제 시, 삭제된 구슬이 삭제되지 않는 이슈 (모달 진입한 구슬이 삭제)
  if (!marbleList.length) return null;
  return (
    <ConfirmDialog>
      {isModalOpen && Boolean(selectedMarbleId !== -1) && (
        <MarbleModal
          isOpen={isModalOpen}
          selectedMarbleId={selectedMarbleId}
          marbleList={marbleList}
          onUpdateMarbleList={onUpdateMarbleList}
          onChangeOpenState={onChangeModalState}
          onUpdateViewIdxList={onUpdateViewIdxList}
        />
      )}

      {view === "preview-card" && <PreviewCard onChangeView={onChangeView} />}
      {view === "preview-summary" && (
        <PreviewSummary
          marbleNum={marbleList.length}
          onChangeView={onChangeView}
        />
      )}
      {view === "marble-canvas" && (
        <MarbleCanvas
          marbleList={marbleList}
          selectedMarbleId={selectedMarbleId}
          isViewedIdList={isViewedIdList}
          isModalOpen={isModalOpen}
          onChangeView={onChangeView}
          onChangeSelectedMarbleId={onChangeSelectedMarbleId}
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
    </ConfirmDialog>
  );
};
