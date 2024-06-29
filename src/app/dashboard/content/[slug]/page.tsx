"use client";

import { useState } from "react";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TEMPLATE } from "@/types";
import FormSection from "../_component/FormSection";
import Result from "../_component/Result";
import templates from "@/data/templates";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/model/aiModel";
import { db } from "@/lib/db";
import { AiResult } from "@/lib/schema";

interface CreatePageProps {
  params: {
    slug: string;
  };
}

const CreatePage = ({ params }: CreatePageProps) => {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string>("");

  const selectedTemplate: TEMPLATE | undefined = templates.find(
    (item) => item.slug === params.slug
  );

  const generateAIContent = async (formData: Record<string, string>) => {
    setLoading(true);
    setAiResult("");

    try {
      const selectedPrompt = selectedTemplate?.aiPrompt || "";
      const finalAIPrompt = `${JSON.stringify(formData)}, ${selectedPrompt}`;

      // Here we're calling the actual AI model
      const result = await chatSession.sendMessage(finalAIPrompt);
      const responseText = await result.response.text();

      // Update the aiResult with the AI-generated content
      setAiResult(responseText);

      // Saving Data in DB
      await saveInDatabase(formData, selectedPrompt?.slug);
    } catch (error) {
      console.error("Error generating AI content:", error);
      setAiResult(
        "An error occurred while generating content. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const saveInDatabase = async (formData: any, slug: any) => {
    const result = await db.insert(AiResult).values({
      formData: formData,
      slug: slug,
      aiResponse: aiResult,
      // createdBy: user,
    });
  };

  return (
    <div className="p-5">
      <Link href="/dashboard">
        <Button>
          <IoMdArrowRoundBack size={20} className="mr-2" /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={generateAIContent}
          isLoading={loading}
        />
        <div className="col-span-2">
          <Result content={aiResult} isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
