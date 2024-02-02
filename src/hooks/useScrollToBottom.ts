import { useEffect } from "react";

export function UseScrollToBottom(condition: boolean) {
  const scrollToBottom = () => {
    document.body.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    condition && scrollToBottom();
  }, [condition]);

  return;
}
