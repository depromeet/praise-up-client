import clsx from "clsx";
import { SetStateAction, useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import "@/style/cropper.css";

import { getCroppedImg } from "@/hooks/useCroppedImage";

type CropperProps = {
  src: string;
  openCrop: React.Dispatch<SetStateAction<boolean>>;
  scaleImage: React.Dispatch<SetStateAction<string>>;
};

type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const ImageCropper = ({ src, openCrop, scaleImage }: CropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = (await getCroppedImg(
          src,
          croppedAreaPixels,
        )) as BlobPart;
        if (typeof croppedImage === "string") {
          scaleImage(croppedImage);
        }
        openCrop(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const closeCropper = () => {
    openCrop(false);
    scaleImage("");
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <Cropper
        image={src}
        crop={crop}
        zoom={zoom}
        aspect={4 / 4}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
      <div
        className={clsx(
          "text-b1 fixed bottom-0 z-10 mx-[15px] mb-[34px] flex justify-between gap-60 text-white ",
        )}
      >
        <span onClick={closeCropper} className="block cursor-pointer">
          취소
        </span>
        <span
          onClick={() => {
            void showCroppedImage();
          }}
          className="block cursor-pointer"
        >
          선택
        </span>
      </div>
    </div>
  );
};
