import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import { MenuIconSVG } from "@/assets/icons/menu-icon";
import { useApiDeletePost } from "@/hooks/api/detail/useApiDeletePost";
import { ConfirmModal, MainButton, SubButton } from "@/hooks/modal/modals";
import { useModal } from "@/hooks/modal/useModal";
import { handleIllust } from "@/utils/handleIllust";

interface MenuProps {
  postId: number;
  isPublic: boolean;
  isReadyCard: boolean;
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

export const Menu = ({
  postId,
  isPublic,
  isReadyCard,
  showMenu,
  setShowMenu,
}: MenuProps) => {
  const [render, modal] = useModal();
  const isUpdated = useRef<boolean>(false);

  const deleteMenuRef = useRef<HTMLButtonElement>(null);
  const menuIconRef = useRef<HTMLDivElement>(null);

  const mutation = useApiDeletePost();

  // 메뉴 외부 영역 클릭시 메뉴 닫는 로직
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (deleteMenuRef.current && !deleteMenuRef.current.contains(target)) {
      setShowMenu(false);
      isUpdated.current =
        menuIconRef.current && !menuIconRef.current.contains(target)
          ? false
          : true;
    }
  };

  useEffect(() => {
    if (!showMenu) return;
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const handleModal = async () => {
    const result = await modal(
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
    if (result === "cancel") return;
    handleIllust.remove(postId);
    mutation.mutate(postId);
  };

  return (
    <>
      {!isPublic && !isReadyCard && (
        <div
          ref={menuIconRef}
          className="h-fit cursor-pointer"
          onClick={() => {
            if (!showMenu && !isUpdated.current) setShowMenu(true);
            isUpdated.current = false;
          }}
        >
          <MenuIconSVG />
        </div>
      )}
      {showMenu && (
        <button
          className="absolute right-4 top-[50px] z-10 flex h-11 items-center rounded-3 bg-white px-4 py-3"
          onClick={handleModal}
          ref={deleteMenuRef}
        >
          <span className="text-b3-compact select-none">삭제하기</span>
        </button>
      )}
      {render()}
    </>
  );
};
