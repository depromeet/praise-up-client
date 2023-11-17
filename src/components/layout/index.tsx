import { Outlet } from "react-router-dom";

export const GlobalLayout = () => {
  return (
    <main>
      {/* main content */}
      <Outlet />
    </main>
  );
};
