import CompanyOverview from "./sections/CompanyOverview";
import AboutCompany from "./sections/AboutCompany";
import ProductsServices from "./sections/ProductsServices";
import CompanyTeam from "./sections/CompanyTeam";
import ProjectsWork from "./sections/ProjectsWork";
import Achievements from "./sections/Achievements";
import MediaUpdates from "./sections/MediaUpdates";
import ContactConnect from "./sections/ContactConnect";

const CompanyProfile = () => {
  return (
    <div
      className="
        min-h-screen
        bg-[#F8F8F6]
      "
    >
      {/* Company Hero / Overview */}

      <CompanyOverview />

      {/* About */}

      <AboutCompany />

      {/* Products */}

      <ProductsServices />

      {/* Team */}

      <CompanyTeam />

      {/* Projects */}

      <ProjectsWork />

      {/* Achievements */}

      <Achievements />

      {/* Updates */}

      <MediaUpdates />

      {/* Contact */}

      <ContactConnect />
    </div>
  );
};

export default CompanyProfile;
