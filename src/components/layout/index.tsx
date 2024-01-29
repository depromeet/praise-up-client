import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useNavigate } from "react-router-dom";

import globalRouter from "@/hooks/navigate/globalRouter";

export const GlobalLayout = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  return (
    <Fragment>
      <Helmet>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://praise-up.app/" />
        <meta property="og:title" content="이미지로 소통하며 칭찬 주고 받기" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Chaemin-L/P.P-client/main/public/image_OG.png"
        />
        <meta property="og:site_name" content="PRAISE UP" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <meta property="og:description" content="praise up" />
        <meta name="description" content="praise up" />
      </Helmet>
      <main className="h-full w-full">
        <Outlet />
      </main>
    </Fragment>
  );
};
