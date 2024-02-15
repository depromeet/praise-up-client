import { ImageProps } from "./image-input";

export const ImageContainer = ({ src, onChange }: ImageProps) => {
  return (
    <div
      className="relative z-0 flex w-full cursor-pointer rounded-4 border border-gray-200 bg-slate-100 bg-cover pb-[100%]"
      style={{ backgroundImage: `url(${src})` }}
    >
      <label htmlFor="image">
        <div className="absolute bottom-0 right-0 mb-4 mr-4 flex h-34px w-80px cursor-pointer items-center justify-center rounded-2 border border-gray-300 bg-gray-50">
          <span className="text-cap-strong text-teritary">이미지 변경</span>
        </div>
      </label>
      <input
        type="file"
        title="사진 첨부"
        className="hidden"
        id="image"
        accept="image/*"
        onChange={onChange}
      />
    </div>
  );
};
