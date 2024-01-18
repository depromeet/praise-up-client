import { Outlet } from "react-router-dom";

export const GlobalLayout = () => {
  return (
    <main className="h-full w-full">
      <Outlet />
    </main>
  );
};
