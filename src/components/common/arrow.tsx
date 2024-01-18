import clsx from "clsx";
import { motion } from "framer-motion";

import Icon from "@/assets/icons/arrow.svg?react";

type Props = {
  className?: string;
};

export const Arrow = ({ className }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: [0.4, 1, 0.4], y: [10, 0, 10] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Icon width={38} height={34} className={clsx(className, "mb-9")} />
    </motion.div>
  );
};
