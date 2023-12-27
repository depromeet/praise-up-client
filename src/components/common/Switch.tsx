interface SwtichProps {
  state: boolean;
}

export const Switch = ({ state }: SwtichProps) => {
  return (
    <div
      className={`flex w-11 items-center rounded-[40px] p-2px transition-all duration-300 ${
        state ? "bg-[#23B36B]" : "bg-gray-400"
      }`}
    >
      <div
        className={`h-5 w-5 rounded-full bg-white transition-all duration-300 ${
          state && "translate-x-full"
        }`}
      ></div>
    </div>
  );
};
