import { ConfirmModal, MainButton, SubButton } from "@/hooks/modal/modals";
import { useModal } from "@/hooks/modal/useModal";

interface DeleteConfirmModal {
  toggleShowMenu: () => void;
}

export const DeleteConfirmModal = ({ toggleShowMenu }: DeleteConfirmModal) => {
  const [render, modal] = useModal();

  const handleModal = async () => {
    await modal(
      <ConfirmModal
        title="칭찬게시물을 삭제할까요?"
        description="게시물과 쌓인 반응이 모두 삭제돼요"
        buttons={[
          <SubButton
            key="unpublished-post-cancel"
            label="취소"
            value="cancel"
          />,
          <MainButton
            key="unpublished-post-delete"
            label="삭제"
            value="confirm"
          />,
        ]}
      />,
    );

    toggleShowMenu();
  };

  return (
    <>
      <button
        className="absolute right-4 top-[50px] z-10 flex h-11 items-center rounded-3 bg-white px-4 py-3"
        onClick={handleModal}
      >
        <span className="text-b3-compact">삭제하기</span>
      </button>
      {render()}
    </>
  );
};
