import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { Appbar } from "@/components/common/appbar";
import { ButtonProvider } from "@/components/common/button-provider";
import { Header } from "@/components/common/header";
import { Input } from "@/components/common/input";
import { DefaultLayout } from "@/components/layout/default";
import { toast } from "@/helpers/toast";
import { useApiChangeName } from "@/hooks/api/my-page/useApiChangeName";
import { useAuthStore } from "@/store/auth";

type TLocation = {
  state: {
    name: string;
  };
};

export const MyPageEdit = () => {
  const nav = useNavigate();
  const location = useLocation() as TLocation;
  const { auth } = useAuthStore();
  const { mutate: changeName, isSuccess } = useApiChangeName(auth.userId);

  const [nickName, setNickName] = useState<string>("");

  useEffect(() => {
    if (!location) return;

    const { state } = location;
    setNickName(state.name || "");
  }, [location]);

  useEffect(() => {
    if (!isSuccess) return;

    nav(-1);
    toast("닉네임이 수정되었어요");
  }, [isSuccess]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.currentTarget.value);
  };

  const onSubmit = () => {
    changeName(nickName);
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

      <ButtonProvider>
        <ButtonProvider.Primary disabled={!nickName.length} onClick={onSubmit}>
          변경하기
        </ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
};
