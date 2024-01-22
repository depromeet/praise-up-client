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
  onDeleteMarbleBody: (id: number) => void;
  selectedMarbleId: number;
  marbleList: TMarble[];
  onUpdateMarbleList: () => void;
  onUpdateViewIdxList: (activeIdx: number) => void;
}

export const MarbleModal = ({
  isOpen,
  onCloseModal,
  onDeleteMarbleBody,
  selectedMarbleId,
  marbleList,
  onUpdateMarbleList,
  onUpdateViewIdxList,
}: Props) => {
  const [swiper, setSwiper] = useState<SwiperCore>();
  const [swiperMarbleList, setSwiperMarbleList] =
    useState<TMarble[]>(marbleList);
  const [activeMarbleId, setActiveMarbleId] =
    useState<number>(selectedMarbleId);

  useEffect(() => {
    const idx = swiperMarbleList.findIndex(
      ({ commentId }) => commentId === activeMarbleId,
    );
    onUpdateViewIdxList(idx);
  }, [activeMarbleId, swiperMarbleList]);

  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const onSlideChange = () => {
    if (!swiper) return;
    const activeMarbleId = swiperMarbleList[swiper.realIndex].commentId;
    setActiveMarbleId(activeMarbleId);
  };

  const onClickClose = () => {
    onCloseModal(activeMarbleId);
  };

  const onDeleteMarble = () => {
    if (!swiper) return;

    const nextMarbleList = swiperMarbleList.filter(
      ({ commentId }) => commentId !== activeMarbleId,
    );

    onDeleteMarbleBody(activeMarbleId);
    setSwiperMarbleList(nextMarbleList);
    setActiveMarbleId(nextMarbleList[swiper.realIndex].commentId);

    // API
    onUpdateMarbleList();
  };

  if (!isOpen || !swiperMarbleList || activeMarbleId === -1) return null;
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
          {/* <p className="font-medium text-gray-800">{`${activeMarbleIdx + 1} / ${
            marbleList.length
          }`}</p> */}
        </div>
        <div className="mt-[52.5px]">
          <Swiper
            onSwiper={setSwiper}
            className="init-swiper archive-swiper"
            slidesPerView={1}
            loop={true}
            centeredSlides={true}
            initialSlide={swiperMarbleList.findIndex(
              ({ commentId }) => commentId === activeMarbleId,
            )}
            modules={[Pagination]}
            onSlideChange={onSlideChange}
            pagination={{
              type: "bullets",
              dynamicBullets: true,
            }}
          >
            {swiperMarbleList.map((marble) => (
              <SwiperSlide key={marble.commentId} className="cursor-pointer">
                <MarbleDetailCard
                  marble={marble}
                  onDeleteMarble={onDeleteMarble}
                />
              </SwiperSlide>
            ))}
          </Swiper>
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
