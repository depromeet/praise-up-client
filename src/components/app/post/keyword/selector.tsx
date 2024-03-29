import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import clsx from "clsx";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  MotionValue,
  AnimationControls,
  useDragControls,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";

import Marble from "@/assets/images/swiper-marble.svg?react";

import "swiper/scss";
import "swiper/scss/pagination";
import { Arrow } from "@/components/common/arrow";
import "@/style/swiper/keyword.scss";
import { useApiLoadKeyword } from "@/hooks/api/post/useApiLoadKeyword";

type contentProps = {
  text: string;
  isActive?: boolean;
  className?: string;
  id?: string;
};

export type keywordProps = {
  keywordId: number;
  keyword: string;
};

type selectorProps = {
  angle: number;
  setAngle: React.Dispatch<React.SetStateAction<number>>;
  snap: boolean;
  setSnap: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Selector = ({
  snap,
  angle,
  setAngle = () => {},
  setSnap = () => {},
}: selectorProps) => {
  const currentIndex = useRef(0);
  const marbleRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperRef>(null);
  const constraintsRef = useRef(null);
  const controls = useDragControls();
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState("");
  const [keyword, setKeyword] = useState<keywordProps[]>([]);

  const y: MotionValue<number> = useMotionValue(0);
  const yTransform = useTransform(y, (value: number) => value);
  const animateContentControls: AnimationControls = useAnimation();
  const animateMarbleControls: AnimationControls = useAnimation();
  const { data } = useApiLoadKeyword();

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;
    setKeyword(data);
  }, [data]);

  /** 사용자의 뷰포트를 감지하여, 뷰포트보다 살짝 크게 스와이퍼 너비를 형성 */
  useEffect(() => {
    if (!window.visualViewport || !swiperRef.current) return;
    disableBodyScroll(document.body);
    const viewPortWidth = window.visualViewport.width;
    swiperRef.current.style!.width =
      viewPortWidth >= 480 ? `${480 + 35}px` : `${viewPortWidth + 35}px`;
    return () => enableBodyScroll(document.body);
  }, []);

  /** 키워드를 드래그 시에, 구슬도 같이 움직일 수 있도록 동기화 */
  useEffect(() => {
    const unsubscribe = yTransform.onChange((value: number) => {
      void animateMarbleControls.start({
        y: value,
      });
      if (value < -50) {
        unsubscribe();
        void animateContentControls.start({
          y: [-20, -140, -120, -140],
          transition: {
            duration: 0.6,
            times: [0, 0.6, 0.8, 1],
            ease: ["backOut"],
          },
        });
        void animateMarbleControls.start({
          y: [-20, -140, -120, -140],
          transition: {
            duration: 0.6,
            times: [0, 0.6, 0.8, 1],
            ease: ["backOut"],
          },
        });
        setSnap(true);
        setCurrentText(keyword[currentIndex.current].keyword);
        return setTimeout(() => {
          navigate("/post/write", {
            state: {
              keyword: keyword[currentIndex.current].keyword,
              keywordId: keyword[currentIndex.current].keywordId,
            },
          });
        }, 1000);
      }
    });
    return unsubscribe;
  }, [yTransform, animateMarbleControls, keyword]);

  const Content = ({
    text,
    isActive,
    className,
    id,
    ...props
  }: contentProps) => {
    return (
      <motion.div
        animate={animateContentControls}
        className={clsx("text-h3 z-20", className)}
        drag="y"
        dragControls={controls}
        dragElastic={{ top: 0.6, bottom: 0 }}
        dragSnapToOrigin={true}
        dragTransition={{
          bounceStiffness: 400,
          bounceDamping: 100,
        }}
        dragConstraints={{ top: -10, bottom: 0 }}
        style={isActive ? { y } : {}}
        {...props}
      >
        <span id={id}>{text}</span>
      </motion.div>
    );
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <Arrow />
      <motion.div
        ref={constraintsRef}
        dragElastic={0.5} // 탄력성 설정, 0에서 1 사이의 값
        className="relative top-0 z-10 flex h-auto w-[480px] items-center justify-center"
      >
        <motion.div
          animate={animateMarbleControls}
          dragElastic={0.5} // 탄력성 설정, 0에서 1 사이의 값
          ref={marbleRef}
        >
          <div className="relative flex items-center justify-center">
            <Marble
              width={244}
              height={244}
              className={clsx("transition-all duration-500")}
              direction={"vertical"}
              style={{ transform: `rotate(${angle}deg)` }}
            />
            {snap ? (
              <Content
                text={currentText}
                className="absolute"
                id="selected_marble_text"
              />
            ) : null}
          </div>
        </motion.div>

        <Swiper
          slidesPerView={3}
          centeredSlides={true} // 슬라이드가 중앙에 위치하도록 함
          spaceBetween={0}
          pagination={true}
          onSlideChange={(event) => {
            currentIndex.current = event.activeIndex;
            if (event.swipeDirection === "next") {
              setAngle((prevAngle) => prevAngle + 90);
            } else {
              setAngle((prevAngle) => prevAngle - 90);
            }
          }}
          modules={[Pagination]}
          className="keyword-swiper !absolute z-0 h-[360px] w-full text-center"
          ref={swiperRef}
          style={{ opacity: snap ? "0%" : "100%" }}
        >
          {keyword.map((item, index) => {
            return (
              <SwiperSlide key={item.keywordId}>
                <Content
                  text={item.keyword}
                  isActive={index === currentIndex.current}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </motion.div>
    </div>
  );
};
