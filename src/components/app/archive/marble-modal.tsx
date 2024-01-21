import "swiper/scss/pagination";
import "@/style/swiper/archive-init.scss";

// custom pagination style
import "@/style/swiper/archive-pagination.scss";

import { useEffect, useState } from "react";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Close from "@/assets/icons/close.svg?react";
import { MarbleDetailCard } from "@/components/app/archive/marble-detail-card";
import { TMarble } from "@/types/archive";

interface Props {
  isOpen: boolean;
  onCloseModal: (id: number) => void;
  selectedMarbleId: number;
  marbleList: TMarble[];
  onUpdateMarbleList: () => void;
  onUpdateViewIdxList: (activeIdx: number) => void;
}

export const MarbleModal = ({
  isOpen,
  onCloseModal,
  selectedMarbleId,
  marbleList,
  onUpdateMarbleList,
  onUpdateViewIdxList,
}: Props) => {
  const [swiperOptions, setSwiperOptions] = useState<unknown>(null);
  const [activeMarbleIdx, setActiveMarbleIdx] = useState<number>(-1);

  useEffect(() => {
    if (!swiperOptions && selectedMarbleId !== -1 && marbleList.length) {
      setSwiperOptions({
        className: "init-swiper archive-swiper",
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        initialSlide: marbleList.findIndex(
          (marble) => marble.commentId === selectedMarbleId,
        ),
        modules: [Pagination],
        onSlideChange: (swiper: SwiperCore) => {
          const activeMarbleIdx = swiper.realIndex;
          setActiveMarbleIdx(activeMarbleIdx);
        },
        pagination: {
          type: "bullets",
          dynamicBullets: true,
        },
      });
    }
  }, [swiperOptions, selectedMarbleId, marbleList]);

  useEffect(() => {
    onUpdateViewIdxList(activeMarbleIdx);
  }, [activeMarbleIdx]);

  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const onClickClose = () => {
    const activeMarbleId = marbleList[activeMarbleIdx].commentId;
    onCloseModal(activeMarbleId);
  };

  if (!isOpen) return null;

  return (
    <>
      <dialog className="fixed left-0 top-0 z-40 block h-fit w-full max-w-[480px] bg-transparent text-black">
        <div className="relative box-border flex h-16 w-full items-center justify-center bg-[#EFF1F4] px-[16px]">
          <button
            onClick={onClickClose}
            className="absolute left-4 h-44px w-44px cursor-pointer"
          >
            <Close />
          </button>
          <p className="font-medium text-gray-800">{`${activeMarbleIdx + 1} / ${
            marbleList.length
          }`}</p>
        </div>
        <div className="mt-[52.5px]">
          {Boolean(selectedMarbleId !== -1) && !!swiperOptions && (
            <Swiper {...swiperOptions}>
              {marbleList.map((marble) => (
                <SwiperSlide key={marble.commentId} className="cursor-pointer">
                  <MarbleDetailCard
                    marble={marble}
                    onClickClose={onClickClose}
                    onUpdateMarbleList={onUpdateMarbleList}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </dialog>
      <div
        onClick={onClickClose}
        className="fixed left-1/2 z-20 mx-auto h-full w-full max-w-[480px] translate-x-[-50%] backdrop-blur-[10px]"
        style={{
          background:
            "linear-gradient(180deg, #EFF1F4 17.19%, rgba(239, 241, 244, 0.40) 101.15%)",
        }}
      />
    </>
  );
};
