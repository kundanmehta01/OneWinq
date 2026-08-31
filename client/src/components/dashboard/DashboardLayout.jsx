import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <section className="dashboard-content">
        <Navbar />
        <Outlet />
      </section>
    </div>
  );
}
