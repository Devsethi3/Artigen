import React from "react";
import SearchSection from "./_component/SearchSection";
import TemplateList from "./_component/TemplateList";

const DashbaordPage = () => {
  return (
    <div>
      {/* Search Section */}
      <SearchSection />
      {/* Templates List Section */}
      <TemplateList />
    </div>
  );
};

export default DashbaordPage;
