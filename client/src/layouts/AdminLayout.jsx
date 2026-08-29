import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

const AdminLayout = () => {
  return (
    <div
      className="
        min-h-screen
        bg-[#F8F8F6]
        flex
      "
    >
      {/* Sidebar */}

      <AdminSidebar />

      {/* Main */}

      <div
        className="
          flex-1
        "
      >
        <AdminNavbar />

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

export default AdminLayout;
