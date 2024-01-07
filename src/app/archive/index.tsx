import { useEffect, useState } from "react";

import { MarbleCanvas } from "./marbleCanvas";
import { MarbleGrid } from "./marbleGrid";
import { Preview } from "./preview";

import { ConfirmDialog } from "@/components/common/confirm/confirmDialog";
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
    <ConfirmDialog>
      <Preview />
      {/* <MarbleCanvas marbleList={marbleList} /> */}
      {/* <MarbleGrid marbleList={marbleList} /> */}
    </ConfirmDialog>
  );
};
