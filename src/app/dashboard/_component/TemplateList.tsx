import templates from "@/data/templates";
import { FORM, TEMPLATE } from "@/types";
import React from "react";
import TemplateCard from "./TemplateCard";

const TemplateList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 m-8">
      {templates.map((item: TEMPLATE, index: number) => (
        <TemplateCard {...item} />
      ))}
    </div>
  );
};

export default TemplateList;
