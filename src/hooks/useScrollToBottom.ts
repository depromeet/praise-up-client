import { useEffect } from "react";

export function UseScrollToBottom(condition: boolean, deps: unknown[]) {
  const scrollToBottom = () => {
    document.body.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    condition && scrollToBottom();
  }, [condition, deps]);

  return;
}
