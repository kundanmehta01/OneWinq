import { Outlet } from "react-router-dom";

import CompanyNavbar from "../components/company/CompanyNavbar";
import CompanyFooter from "../components/company/CompanyFooter";

const CompanyLayout = () => {
  return (
    <div
      className="
        min-h-screen
        bg-[#F8F8F6]
      "
    >
      <CompanyNavbar />

      <main>
        <Outlet />
      </main>

      <CompanyFooter />
    </div>
  );
};

export default CompanyLayout;
