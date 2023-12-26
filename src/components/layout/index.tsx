import { Outlet } from "react-router-dom";

export const GlobalLayout = () => {
  return (
    <main className="max-w-[480px]">
      <Outlet />
    </main>
  );
};
