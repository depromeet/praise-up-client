export const MarbleDetailCard = () => {
  return (
    <div className="mx-[20px] flex flex-col justify-center gap-4 self-stretch rounded-2xl bg-[url('/src/assets/marble_detail_bg.jpg')] bg-cover px-4 pb-5 pt-4">
      <div className="box-border w-full rounded-xl bg-black after:block after:pb-[calc(100%)]"></div>
      <div className="text-gray-800">
        오늘도 요리한 당신 정말 대단하다
        <br />
        앞으로도 그렇게 열심히 요리길만 걷기를
      </div>
      <div className="flex items-center justify-start gap-1 font-semibold">
        <span className="text-gray-500">from.</span>
        <span className="text-gray-800">태롱이</span>
      </div>
    </div>
  );
};
