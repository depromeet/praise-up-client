import { useEffect, useState } from "react";

import { Marble } from "./marble";
import { MarbleGrid } from "./marbleGrid";
import { Preview } from "./preview";

import tempData from "@/data/tempData.json";
import { TMarble } from "@/types/archive";

export const Archive = () => {
  const [marbleList, setMarbleList] = useState<TMarble[]>();

  useEffect(() => {
    // TODO: server Data
    if (!tempData.data.length) return;

    setMarbleList(tempData.data);
  }, []);

  if (!marbleList) return null;
  return (
    <>
      {/* <Preview /> */}
      {/* <Marble /> */}
      <MarbleGrid marbleList={marbleList} />
    </>
  );
};
