import { useState } from "react";

import { ArticleWrapper } from "@/components/app/post/common/ArticleWrapper";
import { ButtonProvider } from "@/components/common/button-provider";
import { Header } from "@/components/common/header";
import { Input } from "@/components/common/input";
import { DefaultLayout } from "@/components/layout/default";

export const SetNickName = () => {
  const [name, setName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <DefaultLayout>
      <ArticleWrapper>
        <Header
          text="{사용할 닉네임을 입력해주세요}"
          subText="닉네임은 언제든 변경이 가능해요!"
        />
        <div className="flex flex-col gap-y-4">
          <h2 className="text-h4">닉네임 설정</h2>
          <Input
            placeholder="닉네임은 언제든 변경이 가능해요!"
            limit={4}
            value={name}
            onChange={handleChange}
          />
        </div>
      </ArticleWrapper>
      <ButtonProvider>
        <ButtonProvider.Primary disabled={!(name.length > 0)}>
          확인
        </ButtonProvider.Primary>
      </ButtonProvider>
    </DefaultLayout>
  );
};
