import { Outlet } from "react-router-dom";

import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <Header />
      <main className="min-h-[calc(100vh-65px)]">
        <Outlet />
      </main>
    </div>
  );
}
