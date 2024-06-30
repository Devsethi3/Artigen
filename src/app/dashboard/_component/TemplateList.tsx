import templates from "@/data/templates";
import { TEMPLATE } from "@/types";
import React from "react";
import TemplateCard from "./TemplateCard";

const TemplateList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 sm:p-6 md:p-8 auto-rows-fr">
      {templates.map((item: TEMPLATE, index: number) => (
        <div key={index} className="flex">
          <TemplateCard {...item} />
        </div>
      ))}
    </div>
  );
};

export default TemplateList;
