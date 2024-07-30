"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { BsStars } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TEMPLATE, FormField } from "@/types";
import { LuLoader2 } from "react-icons/lu";

interface FormSectionProps {
  selectedTemplate?: TEMPLATE;
  userFormInput: any;
  isLoading: boolean;
}

interface FormData {
  [key: string]: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  selectedTemplate,
  userFormInput,
  isLoading,
}) => {
  const [formData, setFormData] = useState<FormData>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    userFormInput(formData);
  };

  const renderFormField = (item: FormField) => {
    const commonProps = {
      name: item.name,
      required: item.required,
      onChange: handleInputChange,
      value: formData[item.name] || "",
      placeholder: item.placeholder || "",
      className: "w-full",
    };

    switch (item.field) {
      case "input":
        return <Input {...commonProps} />;
      case "textarea":
        return <Textarea {...commonProps} />;
      default:
        return null;
    }
  };

  if (!selectedTemplate) {
    return <div>No template selected</div>;
  }

  return (
    <>
      <div className="rounded-lg shadow-md p-5 border">
        <Image
          src={selectedTemplate.icon}
          width={60}
          height={60}
          alt={selectedTemplate.name}
        />
        <h2 className="font-bold text-2xl my-3">{selectedTemplate.name}</h2>
        <p className="pb-2">{selectedTemplate.desc}</p>

        <form onSubmit={onSubmit} className="border-t pt-2">
          {selectedTemplate.form?.map((item, index) => (
            <div key={index} className="my-2 flex flex-col gap-2 mb-7">
              <label
                htmlFor={item.name}
                className="text-xs text-muted-foreground"
              >
                {item.label}
              </label>
              {renderFormField(item)}
            </div>
          ))}
          <Button type="submit" className="w-full py-6" disabled={isLoading}>
            {isLoading ? (
              <LuLoader2 className="animate-spin w-4 h-4 mr-3" />
            ) : (
              <BsStars size={20} className="mr-3" />
            )}
            Generate Content
          </Button>
        </form>
      </div>
    </>
  );
};

export default FormSection;
