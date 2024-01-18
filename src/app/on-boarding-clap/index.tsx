import { useState } from "react";

import { Carousel } from "@/components/app/on-boarding/clap/carousel";
import { Background } from "@/components/app/post/keyword/background";
import { ButtonProvider } from "@/components/common/button-provider";
import { DefaultLayout } from "@/components/layout/default";

export const OnBoardingClap = () => {
  const [angle, setAngle] = useState(0);

  return (
    <DefaultLayout
      appbar={false}
      noXPadding={true}
      noYPadding={true}
      className="overflow-x-hidden"
    >
      <Background angle={angle} />
      <Carousel setAngle={setAngle} />
      <ButtonProvider className="!bg-transparent px-5">
        <ButtonProvider.Primary>시작하기</ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
};
