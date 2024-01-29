export const Background = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -z-10 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col overflow-x-hidden blur-[50px]">
      <div className=" mt-[100px] w-full  flex-[1.5] -translate-x-1/3 rounded-full bg-[#BDE0FF] opacity-25" />
      <div className=" w-full flex-1 translate-x-1/3 rounded-full bg-[#FFECA9] opacity-25" />
    </div>
  );
};
