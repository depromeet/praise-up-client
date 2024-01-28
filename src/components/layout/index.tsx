import { Outlet, useNavigate } from "react-router-dom";

import globalRouter from "@/hooks/navigate/globalRouter";

export const GlobalLayout = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  return (
    <main className="h-full w-full">
      <Outlet />
    </main>
  );
};
