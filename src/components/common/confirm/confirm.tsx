type Props = {
  message: {
    title: string;
    description: string;
  };
  onClickConfirm: () => void;
  onClickCancel: () => void;
};

export const Confirm = ({ message, onClickConfirm, onClickCancel }: Props) => {
  return (
    <div>
      <div className="fixed left-1/2 top-1/2 z-50 mx-auto box-border h-fit w-full max-w-[480px] translate-x-[-50%] translate-y-[-50%] ">
        <div className="mx-[20px] flex flex-col items-center gap-7 rounded-2xl bg-white px-4 pb-4 pt-8">
          <div className="flex flex-col items-center gap-1">
            <div className="text-lg font-semibold text-gray-800">
              {message.title}
            </div>
            <div className="text-sm text-gray-500">{message.description}</div>
          </div>
          <div className="flex gap-2.5 self-stretch">
            <button
              onClick={onClickCancel}
              className="flex h-[54px] grow items-center justify-center rounded-lg bg-zinc-200"
            >
              <p className="w-full font-semibold text-gray-800">취소</p>
            </button>
            <button
              onClick={onClickConfirm}
              className="flex h-[54px] grow items-center justify-center rounded-lg bg-red-500"
            >
              <p className="w-full font-semibold text-white">삭제</p>
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={onClickCancel}
        className="fixed top-0 z-40 h-full w-full bg-black/60"
      />
    </div>
  );
};
