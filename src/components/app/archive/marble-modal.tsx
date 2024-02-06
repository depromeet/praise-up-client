import "swiper/scss/pagination";
import "@/style/swiper/archive-init.scss";

// custom pagination style
import "@/style/swiper/archive-pagination.scss";

import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Close from "@/assets/icons/close.svg?react";
import Download from "@/assets/icons/download.svg?react";
import { MarbleDetailCard } from "@/components/app/archive/marble-detail-card";
import { ButtonProvider } from "@/components/common/button-provider";
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
  const currentSlideRef = useRef<HTMLDivElement>(null);

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

  const onClickDownloadImage = async () => {
    if (!currentSlideRef.current || !swiper) return;

    try {
      const canvas = await html2canvas(currentSlideRef.current, {
        useCORS: true,
        logging: true,
        scale: 2,
      });
      const fileName = `${
        swiperMarbleList[swiper.realIndex].nickname
      }의 구슬.png`;

      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, fileName);
        }
      });
    } catch (error) {
      console.error("이미지 저장에 실패했어요!");
    }
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
          {swiper && (
            <p className="font-medium text-gray-800">{`${
              swiper.realIndex + 1
            } / ${swiperMarbleList.length}`}</p>
          )}
        </div>
        <div>
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
            style={{
              paddingTop: 10,
            }}
          >
            {swiperMarbleList.map((marble, idx) => (
              <SwiperSlide key={marble.commentId} className="cursor-pointer">
                <MarbleDetailCard
                  marble={marble}
                  onDeleteMarble={onDeleteMarble}
                  ref={idx === swiper?.realIndex ? currentSlideRef : undefined}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </dialog>

      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[480px] translate-x-[-50%] px-5">
        <ButtonProvider className="!bg-transparent">
          <ButtonProvider.White onClick={onClickDownloadImage}>
            <div className="flex items-center gap-2">
              <p>이미지 저장하기</p>
              <div className="flex h-5 w-5 items-center justify-center">
                <Download />
              </div>
            </div>
          </ButtonProvider.White>
        </ButtonProvider>
      </div>

      <div
        // NOTE: dim 영역 클릭해도 모달 닫히지 않게 수정
        // onClick={onClickClose}
        className="fixed left-1/2 z-20 mx-auto h-full w-full max-w-[480px] translate-x-[-50%] backdrop-blur-[10px]"
        style={{
          background:
            "linear-gradient(180deg, #EFF1F4 17.19%, rgba(239, 241, 244, 0.40) 101.15%)",
        }}
      />
    </>
  );
};
