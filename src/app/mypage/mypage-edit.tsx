import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { Appbar } from "@/components/common/appbar";
import { Header } from "@/components/common/header";
import { Input } from "@/components/common/input";
import { DefaultLayout } from "@/components/layout/default";

type TLocation = {
  state: {
    name: string;
  };
};

export const MyPageEdit = () => {
  const nav = useNavigate();
  const location = useLocation() as TLocation;
  const [nickName, setNickName] = useState<string>("");

  useEffect(() => {
    if (!location) return;

    const { state } = location;
    setNickName(state.name || "");
  }, [location]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setNickName(e.currentTarget.value);
  };

  return (
    <DefaultLayout
      appbar={
        <Appbar
          left={
            <button onClick={() => nav(-1)}>
              <ChevronLeftEdgeSVG />
            </button>
          }
        />
      }
    >
      <div className="flex flex-col gap-9 py-4">
        <Header text="{사용할 닉네임을 입력해주세요}" />
        <Input
          placeholder="닉네임을 설정해주세요"
          limit={4}
          value={nickName}
          onChange={onChange}
        />
      </div>
    </DefaultLayout>
  );
};
