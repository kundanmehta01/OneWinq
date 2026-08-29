import { Routes, Route } from "react-router-dom";

import CompanyAdminDashboard from "../pages/admin/company/CompanyAdminDashboard";
import CompanyProfile from "../pages/company/CompanyProfile";


const AppRoutes = () => {

  return (
    <Routes>

      <Route 
        path="/admin/company"
        element={<CompanyAdminDashboard />}
      />
               <Route
             path="/company/profile"
             element={<CompanyProfile />}
              />
 
    </Routes>
  );

};


export default AppRoutes;