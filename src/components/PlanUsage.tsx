"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { AiResult } from "@/lib/schema";
import { eq } from "drizzle-orm";

interface AiResultData {
  id: number;
  formData: string;
  aiResponse: string | null;
  slug: string;
  createdBy: string;
  createdAt: string;
}

const PlanUsage: React.FC = () => {
  const { user } = useUser();
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const maxCredits = 10000;

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  const getData = async () => {
    try {
      const results: AiResultData[] = await db
        .select()
        .from(AiResult)
        .where(eq(AiResult.createdBy, user?.primaryEmailAddress?.emailAddress));

      const total = getTotalUsage(results);
      setTotalUsage(total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTotalUsage = (results: AiResultData[]): number => {
    return results.reduce((total, element) => {
      return total + (element.aiResponse ? element.aiResponse.length : 0);
    }, 0);
  };

  const usagePercentage = (totalUsage / maxCredits) * 100;

  return (
    <div>
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2>Credits</h2>
        <div className="h-2 bg-[#ffffff5d] w-full overflow-hidden rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: `${usagePercentage}%`,
            }}
          ></div>
        </div>
        <p className="text-sm opacity-90 mt-2 my-1">
          {totalUsage.toLocaleString()}/{maxCredits.toLocaleString()} credits
          used
        </p>
        <Button
          variant="secondary"
          className="w-full my-3 text-[#093C36] font-bold"
        >
          Upgrade
        </Button>
      </div>
    </div>
  );
};

export default PlanUsage;
