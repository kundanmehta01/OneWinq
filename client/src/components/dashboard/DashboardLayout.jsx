import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
export default function DashboardLayout() {
  return (
    <div className="dashboard-shell">
      <Navbar />
      <div className="dashboard-subnav-bar">
        <Sidebar />
      </div>
      <div className="dashboard-body">
        <Outlet />
      </div>
    </div>
  );
}
