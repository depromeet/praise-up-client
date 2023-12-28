import { Outlet } from "react-router-dom";

export const GlobalLayout = () => {
  return (
    <>
      <main className="h-full w-full">
        <Outlet />
      </main>
      <div id="portal" className="mx-auto h-full w-full max-w-[480px]" />
    </>
  );
};
