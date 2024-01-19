import { useLocation } from "react-router-dom";

export const useDecodeURI = (key: string) => {
  const path = useLocation().pathname.substring(1); // 최초 /  제거
  try {
    const _path: string = decodeURIComponent(atob(path));
    const position: number = _path.indexOf(`${key}=`);

    return position === -1
      ? undefined
      : _path.substring(position + key.length + 1);
  } catch (err) {
    return undefined;
  }
};
