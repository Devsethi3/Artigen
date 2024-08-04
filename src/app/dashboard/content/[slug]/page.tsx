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
import { useUser } from "@clerk/nextjs";
import { useTotalUsage } from "@/context/TotalUsageContext";
import toast from "react-hot-toast";
import { MAXIMUM_PLAN_USAGE_VALUE } from "@/data/constant";

interface CreatePageProps {
  params: {
    slug: string;
  };
}

const CreatePage = ({ params }: CreatePageProps) => {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string>("");
  const { totalUsage, setTotalUsage } = useTotalUsage();
  const { user } = useUser();

  const selectedTemplate: TEMPLATE | undefined = templates.find(
    (item) => item.slug === params.slug
  );

  const generateAIContent = async (formData: Record<string, string>) => {
    if (totalUsage >= MAXIMUM_PLAN_USAGE_VALUE) {
      toast((t: any) => (
        <div className="flex items-center">
          <div className="flex-grow">
            <p className="font-bold">Upgrade to Premium</p>
            <p>You have reached your usage limit.</p>
          </div>
          <button
            className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Dismiss
          </button>
        </div>
      ));
      return;
    }

    setLoading(true);
    setAiResult("");

    try {
      const selectedPrompt = selectedTemplate?.aiPrompt || "";
      const finalAIPrompt = `${JSON.stringify(formData)}, ${selectedPrompt}`;

      const result = await chatSession.sendMessage(finalAIPrompt);
      const responseText = await result.response.text();

      setAiResult(responseText);

      await saveInDatabase(
        formData,
        selectedTemplate?.slug || "",
        responseText
      );

      setTotalUsage((prev: any) => prev + responseText.length);
    } catch (error) {
      console.error("Error generating AI content:", error);
      setAiResult(
        "An error occurred while generating content. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const saveInDatabase = async (
    formData: Record<string, string>,
    slug: string,
    aiResult: string
  ) => {
    await db.insert(AiResult).values({
      formData: JSON.stringify(formData),
      slug: slug,
      aiResponse: aiResult,
      createdBy: user?.primaryEmailAddress?.emailAddress || "",
      createdAt: new Date(),
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
        <div className="lg:col-span-2 w-full">
          <Result content={aiResult} isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
