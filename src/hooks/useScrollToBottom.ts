import { useEffect } from "react";

export function UseScrollToBottom(
  condition: boolean,
  focusTextarea: boolean = false,
) {
  const scrollToBottom = () => {
    document.body.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    condition && scrollToBottom();
    if (focusTextarea) {
      const textareaNode = document.querySelector("textarea");
      textareaNode ? textareaNode.focus() : null;
    }
  }, [condition]);

  return;
}
