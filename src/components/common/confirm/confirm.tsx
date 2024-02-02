import clsx from "clsx";

import { ConfirmDialogType } from "@/types/common";

const btnDefaultStyle =
  "flex basis-0 items-center justify-center py-4 font-semibold rounded-lg h-fit grow";

export const Confirm = ({
  message,
  confirm,
  cancel,
  icon,
}: ConfirmDialogType) => {
  return (
    <div>
      <div className="fixed left-1/2 top-1/2 z-50 mx-auto box-border h-fit w-full max-w-[480px] translate-x-[-50%] translate-y-[-50%]">
        <div className="mx-5 flex flex-col items-center gap-7 rounded-2xl bg-white px-4 pb-4 pt-6">
          <div className="flex flex-col items-center gap-1">
            {icon && <img src={icon} />}
            <div className="mt-2 text-lg font-semibold text-primary">
              {message.title}
            </div>
            <div className="text-sm text-teritary">{message.description}</div>
          </div>
          <div className="flex gap-2.5 self-stretch">
            {cancel && (
              <button
                {...cancel}
                onClick={cancel.onClick}
                className={clsx(btnDefaultStyle, "bg-gray-300")}
              >
                <p className="w-fit text-primary">{cancel.text}</p>
              </button>
            )}
            {confirm && (
              <button
                {...confirm}
                onClick={confirm.onClick}
                className={clsx(btnDefaultStyle, "bg-[#242B37]")}
              >
                <p className="w-fit text-white">{confirm.text}</p>
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        onClick={cancel?.onClick || confirm?.onClick}
        className="fixed top-0 z-40 h-full w-full bg-black/60"
      />
    </div>
  );
};
