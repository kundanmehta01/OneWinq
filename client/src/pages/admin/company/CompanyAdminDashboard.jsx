import { Outlet } from "react-router-dom";

import AdminSidebar from "../../../components/admin/AdminSidebar";
import AdminNavbar from "../../../components/admin/AdminNavbar";

const CompanyAdminDashboard = () => {
  return (
    <div
      className="
        min-h-screen
        flex
        bg-[#F8F8F6]
      "
    >
      {/* Sidebar */}

      <AdminSidebar />

      {/* Main Area */}

      <div
        className="
          flex-1
        "
      >
        {/* Navbar */}

        <AdminNavbar />

        {/* Page Content */}

        <main
          className="
            p-5
            sm:p-8
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CompanyAdminDashboard;
