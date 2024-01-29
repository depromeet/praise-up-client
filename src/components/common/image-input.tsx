import Icon from "@/assets/icons/upload.svg?react";

export type ImageProps = {
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const ImageInput = ({
  placeholder = "사진을 추가해주세요",
  onChange,
  ...props
}: ImageProps) => {
  return (
    <label htmlFor="image">
      <div className="relative z-0 w-full cursor-pointer rounded-4 border border-gray-300 bg-white pb-[100%]">
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center justify-center gap-y-[6px]">
          <Icon width={24} height={24} />
          <span className="text-b3-compact whitespace-nowrap text-gray-600">
            {placeholder}
          </span>
        </div>
        <input
          type="file"
          title="사진 첨부"
          className="hidden"
          id="image"
          accept="image/*"
          onChange={onChange}
          {...props}
        />
      </div>
    </label>
  );
};
