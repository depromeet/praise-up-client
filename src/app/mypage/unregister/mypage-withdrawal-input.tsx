import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ChevronLeftEdgeSVG } from "@/assets/icons/chevron-left";
import { Appbar } from "@/components/common/appbar";
import { ButtonProvider } from "@/components/common/button-provider";
import { Header } from "@/components/common/header";
import { Input } from "@/components/common/input";
import { Textarea } from "@/components/common/textarea";
import { DefaultLayout } from "@/components/layout/default";

type TLocation = {
  state: {
    text: string;
  };
};

export const MyPageUnregisterInput = () => {
  const nav = useNavigate();
  const location = useLocation() as TLocation;

  const [reason, setReason] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.currentTarget.value);
  };

  const onSubmit = () => {
    console.log(reason);
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
        <p className="text-h2">{location.state.text}</p>
        <Textarea
          placeholder="서비스의 개선을 위해 구체적인 이유를 공유해주세요 (선택)"
          limit={300}
          value={reason}
          currentLength={reason.length}
          onChange={onChange}
        />
      </div>

      <ButtonProvider>
        <ButtonProvider.Primary disabled={!reason.length} onClick={onSubmit}>
          변경하기
        </ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
};
