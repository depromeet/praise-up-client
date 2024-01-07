import { useEffect, useState } from "react";

import { MarbleCanvas } from "./marble-canvas";
import { MarbleGrid } from "./marble-grid";
import { Preview } from "./preview";

import { ConfirmDialog } from "@/components/common/confirm/confirm-dialog";
import tempData from "@/data/archive-temp-data.json";
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
    <ConfirmDialog>
      {/* <Preview /> */}
      <MarbleCanvas marbleList={marbleList} />
      {/* <MarbleGrid marbleList={marbleList} /> */}
    </ConfirmDialog>
  );
};
