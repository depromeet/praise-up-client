import { Outlet } from "react-router-dom";

export const GlobalLayout = () => {
  return (
    <main className="mx-auto max-w-[480px]">
      <Outlet />
    </main>
  );
};
