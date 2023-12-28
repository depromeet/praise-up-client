import "@/style/initSwiper.css";

import { Body } from "matter-js";
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import marbleTexture from "@/assets/marble_01/marble_01_2x.webp";

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
        onSlideChange: (swiper: SwiperCore) => {
          const activeDataId = marbleList[swiper.realIndex].id;
          setActiveMarbleId(activeDataId);
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

  //   useEffect(() => {
  //     if (isOpen) document.body.classList.add("overflow-hidden");

  //     return () => {
  //       document.body.classList.remove("overflow-hidden");
  //     };
  //   }, [isOpen]);

  const handleClickDim: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div>
      <dialog className="scroll-none fixed left-1/2 top-0 z-40 block h-fit w-full -translate-x-1/2 translate-y-1/2">
        <div>
          {!!selectedMarble && !!swiperOptions && (
            <Swiper {...swiperOptions}>
              {marbleList.map((marble) => (
                <SwiperSlide key={marble.id} className="cursor-pointer">
                  <div className="h-full w-full">
                    <img
                      src={marbleTexture}
                      alt="modal"
                      className="h-[300px] w-[300px] rounded-sm bg-white"
                    />
                  </div>
                  <div className="sticky left-0 top-1/2 w-full">
                    <p className="mx-auto w-fit">
                      {marble.render.text?.content}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </dialog>
      <div
        onClick={handleClickDim}
        className="fixed left-0 top-0 z-20 h-full w-full bg-[#E0E2E6]/60 backdrop-blur-[20px]"
      />
    </div>
  );
};
