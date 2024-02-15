import { motion } from "framer-motion";

import ToolTipCover from "@/assets/icons/tool-tip/tool-tip.svg?react";

type tooltipProps = {
  text: string;
};

/** TODO: 추후 재사용성을 위한 리팩토링 진행 (현재는 버튼에 종속 및 SVG로 구현) */
export const ToolTip = ({ text }: tooltipProps) => {
  return (
    <motion.div
      className="relative flex h-full w-full animate-fadeIn items-center justify-center"
      initial={{ y: -2 }}
      animate={{ y: 2 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1,
        ease: "easeInOut",
      }}
    >
      <ToolTipCover
        width={294}
        height={56}
        className="relative flex h-full w-full max-w-[281px] items-start"
      />
      <div className="absolute top-0 -mt-[4.5px] flex h-full w-full items-center justify-center">
        <span className="text-b3-compact text-secondary">{text}</span>
      </div>
    </motion.div>
  );
};
