/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import clsx from "clsx";

import { useModal } from "@/hooks/useModal";

interface DeleteConfirmModal {
  toggleShowMenu: () => void;
}

export const DeleteConfirmModal = ({ toggleShowMenu }: DeleteConfirmModal) => {
  const [render, modal] = useModal();

  const BUTTON_STYLE = "flex-1 py-4 px-13 rounded-2 text-b2-strong";

  const handleModal = async () => {
    const test = await modal(
      <div className="rounded-4 bg-oncolor flex w-[320px] flex-col gap-7 px-4 pb-4 pt-8">
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-h3 text-primary">칭찬게시물을 삭제할까요?</h3>
          <span className="text-teritary">
            게시물과 쌓인 반응이 모두 삭제돼요
          </span>
        </div>
        <div className=" flex gap-2.5">
          <button
            className={clsx(BUTTON_STYLE, "text-teritary bg-gray-300")}
            value="cancel"
          >
            취소
          </button>
          <button
            className={clsx(BUTTON_STYLE, "text-oncolor bg-red-500")}
            value="delete"
          >
            삭제
          </button>
        </div>
      </div>,
    );

    // if test === "delete"
    //      call delete api
    //      navigate to main
    //  else nothing
    toggleShowMenu();
  };

  return (
    <>
      <button
        className="rounded-3 absolute right-4 top-[50px] z-10 flex h-11 items-center bg-white px-4 py-3"
        onClick={() => handleModal()}
      >
        <span className="text-b3-compact">삭제하기</span>
      </button>
      {render()}
    </>
  );
};
