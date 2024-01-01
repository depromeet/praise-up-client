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

import { MarbleDetailCard } from "@/components/app/marbleDetailCard";

interface IMarbleModal {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedMarble: Body;
  marbleList: Body[];
  isViewedMarbleList: number[];
  setIsViewedMarbleList: Dispatch<SetStateAction<number[]>>;
}

export const MarbleModal = ({
  isOpen,
  setIsOpen,
  selectedMarble,
  marbleList,
  isViewedMarbleList,
  setIsViewedMarbleList,
}: IMarbleModal) => {
  const [swiperOptions, setSwiperOptions] = useState<unknown>(null);
  const [activeMarbleId, setActiveMarbleId] = useState<number>(-1);

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
          const activeDataId = marbleList[swiper.realIndex].id;
          setActiveMarbleId(activeDataId);
        },
        pagination: {
          type: "bullets",
          dynamicBullets: true,
        },
      });
    }
  }, [swiperOptions, selectedMarble, marbleList]);

  useEffect(() => {
    if (activeMarbleId === -1) return;

    const updatedIsViewedMarbleList = [
      ...new Set([...isViewedMarbleList, activeMarbleId]),
    ];
    setIsViewedMarbleList(updatedIsViewedMarbleList);
  }, [activeMarbleId]);

  useEffect(() => {
    console.log(isViewedMarbleList);
  }, [isViewedMarbleList]);

  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const handleClickDim: MouseEventHandler = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <dialog className="scroll-none fixed left-0 top-0 z-40 block h-fit w-full max-w-[480px] bg-transparent text-black">
        <div className="h-16">Temp Header</div>
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
        onClick={handleClickDim}
        className="fixed top-0 z-20 mx-auto h-full w-full max-w-[480px] bg-[#EFF1F4]/[55%] backdrop-blur-[20px]"
      />
    </>
  );
};
