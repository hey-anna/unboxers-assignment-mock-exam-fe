import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f6f8" }}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
