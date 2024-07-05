"use client";

import templates from "@/data/templates";
import { TEMPLATE } from "@/types";
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";

const TemplateList = ({ searchInput }: any) => {
  const [templateList, setTemplateList] = useState(templates);

  useEffect(() => {
    console.log(searchInput);
    if (searchInput) {
      const filterResult = templates.filter((data) =>
        data.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setTemplateList(filterResult);
    } else {
      setTemplateList(templates);
    }
  }, [searchInput]);

  return (
    <div className="grid grid-cols-2 min-h-screen sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 sm:p-6 md:p-8 auto-rows-fr">
      {templateList.map((item: TEMPLATE, index: number) => (
        <div key={index} className="flex">
          <TemplateCard {...item} />
        </div>
      ))}
    </div>
  );
};

export default TemplateList;
