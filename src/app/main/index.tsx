import React from "react";

import { GoToWrite } from "./go-to-write";
import { ToBeOpen } from "./to-be-open";
import { ToMyArchive } from "./to-my-archive";

import { DefaultLayout } from "@/components/layout/default";

export const Main = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-12 pb-[60px] pt-4">
        <GoToWrite />
        <ToBeOpen />
        <ToMyArchive />
      </div>
    </DefaultLayout>
  );
};
