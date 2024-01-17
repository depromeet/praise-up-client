import { ReactNode } from "react";

type ButtonProps = {
  label: string;
  value: string;
};

export const MainButton = ({ label, value }: ButtonProps) => {
  return (
    <button
      className="px-13 text-b2-strong flex-1 rounded-2 bg-red-500 py-4 text-oncolor"
      value={value}
    >
      {label}
    </button>
  );
};

export const SubButton = ({ label, value }: ButtonProps) => {
  return (
    <button
      className="px-13 text-b2-strong flex-1 rounded-2 bg-gray-300 py-4 text-teritary"
      value={value}
    >
      {label}
    </button>
  );
};

export const ConfirmModal = ({
  title,
  description,
  buttons,
}: {
  title: string;
  description: string;
  buttons: ReactNode[];
}) => {
  return (
    <div className="flex w-[320px] flex-col gap-7 rounded-4 bg-oncolor px-4 pb-4 pt-8">
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-h3 text-primary">{title}</h3>
        <span className="text-teritary">{description}</span>
      </div>
      <div className=" flex gap-2.5">{buttons.map((b) => b)}</div>
    </div>
  );
};
