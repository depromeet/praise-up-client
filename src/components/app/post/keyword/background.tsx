type backgroundProps = {
  angle: number;
};

export const Background = ({ angle }: backgroundProps) => {
  return (
    <div
      className="absolute left-1/2 top-1/2 -z-10 flex h-[825px] w-[700px] flex-col blur-[100px] transition-all duration-500"
      style={{
        transform: `translateX(-50%) translateY(-50%) rotate(${angle}deg)`,
      }}
    >
      <div className="mr-auto h-[545px] w-[545px] rounded-full bg-[#BDE0FF] opacity-50"></div>
      <div className="ml-auto h-[343px] w-[343px] rounded-full bg-[#FFECA9] opacity-50"></div>
      <div></div>
    </div>
  );
};
