import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { MarbleCanvas } from "./marble-canvas";
import { MarbleGrid } from "./marble-grid";
import { PreviewCard } from "./preview-card";
import { PreviewSummary } from "./preview-summary";

import { MarbleModal } from "@/components/app/archive/marble-modal";
import { ConfirmDialog } from "@/components/common/confirm/confirm-dialog";
import { useApiMarbleCard } from "@/hooks/api/archive/useApiMarbleCard";
import { useApiMarbleList } from "@/hooks/api/archive/useApiMarbleList";
import { TArchiveView, TMarble, TRouteState } from "@/types/archive";

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

  // NOTE: Canvas, Grid View value
  const [view, setView] = useState<TArchiveView>("preview-card");

  // NOTE: Marble detail Open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!marbleData?.pages.length) return;

    setMarbleList(marbleData?.pages.flatMap((page) => page.content));
  }, [marbleData]);

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

      {view === "preview-card" && cardData && (
        <PreviewCard cardData={cardData} onChangeView={onChangeView} />
      )}
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
