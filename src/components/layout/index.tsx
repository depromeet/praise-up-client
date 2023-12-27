import { Outlet } from "react-router-dom";

export const GlobalLayout = () => {
  return (
    <main className="w-40px">
      {/* main content */}
      <Outlet />
    </main>
  );
};
