import React from "react";

import { GoToWrite } from "./go-to-write";
import { ToBeOpen } from "./to-be-open";

import { DefaultLayout } from "@/components/layout/default";

export const Main = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-12">
        <GoToWrite />
        <ToBeOpen />
      </div>
    </DefaultLayout>
  );
};
