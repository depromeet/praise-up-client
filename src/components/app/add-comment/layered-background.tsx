import { PropsWithChildren } from "react";

import bg_blur from "@/assets/imgs/bg_blur.svg";
import bg_circles from "@/assets/imgs/bg_circles.svg";

/* 
  일러스트 img [abs] > 흰 배경 img (opacity:75%) [abs] > body [relative]
  위 순서대로 레이어드 배경을 구성합니다
*/

export const LayeredBackground = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen w-full">
      {/* circle 일러스트 img */}
      <div className="absolute left-0  h-full w-full overflow-x-hidden">
        <div
          className="left-0 h-full w-full blur-[50px]"
          style={{
            backgroundImage: `url(${bg_circles})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPositionY: "69px",
          }}
        />
      </div>
      {/* 흰 배경 img (opacity: 75%) */}
      <div
        className="absolute left-0 h-full w-full opacity-75"
        style={{
          background: `url(${bg_blur})`,
          backgroundSize: "contain",
        }}
      />
      {/* body */}
      <div className="relative flex h-full flex-col gap-9 pb-[60px]">
        {children}
      </div>
    </div>
  );
};
