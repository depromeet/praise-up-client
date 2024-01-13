import "swiper/css/pagination";
import "@/style/swiper/initSwiper.css";

// custom pagination style
import "@/style/swiper/archiveSwiperPagination.css";

import { Body } from "matter-js";
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Back from "@/assets/icons/back.svg?react";
import { MarbleDetailCard } from "@/components/app/archive/marble-detail-card";

interface Props {
  isOpen: boolean;
  onChangeOpenState: (isOpen: boolean) => void;
  selectedMarble: Body;
  marbleList: Body[];
  onUpdateViewIdxList: (activeIdx: number) => void;
}

// TODO: marble Grid view를 고려하여 상태 및 props update 예정
export const MarbleModal = ({
  isOpen,
  onChangeOpenState,
  selectedMarble,
  marbleList,
  onUpdateViewIdxList,
}: Props) => {
  const [swiperOptions, setSwiperOptions] = useState<unknown>(null);
  const [activeMarbleIdx, setActiveMarbleIdx] = useState<number>(-1);

  useEffect(() => {
    if (!swiperOptions && selectedMarble && marbleList.length) {
      setSwiperOptions({
        className: "swiper-container",
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        initialSlide: marbleList.findIndex(
          (marble) => marble.id === selectedMarble.id,
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
  }, [swiperOptions, selectedMarble, marbleList]);

  useEffect(() => {
    onUpdateViewIdxList(activeMarbleIdx);
  }, [activeMarbleIdx]);

  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const onClickClose: MouseEventHandler = () => {
    onChangeOpenState(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <dialog className="fixed left-0 top-0 z-40 block h-fit w-full max-w-[480px] bg-transparent text-black">
        <div className="relative box-border flex h-16 w-full items-center justify-center px-[16px]">
          <button
            onClick={onClickClose}
            className="absolute left-4 h-44px w-44px cursor-pointer"
          >
            <Back />
          </button>
          <p className="font-medium text-gray-800">{`${activeMarbleIdx + 1} / ${
            marbleList.length
          }`}</p>
        </div>
        {!!selectedMarble && !!swiperOptions && (
          <Swiper {...swiperOptions}>
            {marbleList.map((marble) => (
              <SwiperSlide key={marble.id} className="cursor-pointer">
                <MarbleDetailCard />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </dialog>
      <div
        onClick={onClickClose}
        className="fixed top-0 z-20 mx-auto h-full w-full max-w-[480px] bg-[#EFF1F4]/[55%] backdrop-blur-[20px]"
      />
    </>
  );
};
