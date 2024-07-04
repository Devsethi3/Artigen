"use client";

import React, { useState } from "react";
import SearchSection from "../_component/SearchSection";
import TemplateList from "../_component/TemplateList";

const TemplatesPage = () => {
  const [searchInput, setSearchInput] = useState<string>();
  return (
    <div>
      {/* Search Section */}
      <SearchSection onSearchInput={(value: string) => setSearchInput(value)} />
      {/* Templates List Section */}
      <TemplateList searchInput={searchInput} />
    </div>
  );
};

export default TemplatesPage;
