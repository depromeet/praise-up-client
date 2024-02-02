type StatsCardProps = {
  title: string;
  count: number;
  imageUrl: string;
};

export const StatsCard = ({ title, count, imageUrl }: StatsCardProps) => {
  return (
    <div className="flex flex-1 flex-col items-center gap-1.5 rounded-4 bg-oncolor px-4 py-5">
      <span className="text-b3-strong text-gray-600">{title}</span>
      <div className="flex gap-1">
        <img src={imageUrl} />
        <span className="text-num-b1-strong">{count}</span>
      </div>
    </div>
  );
};
