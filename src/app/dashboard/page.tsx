"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import LineChart from "@/components/LineChart";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import { ArrowUpIcon } from "lucide-react";
import { db } from "@/lib/db";
import { AiResult } from "@/lib/schema";
import { desc } from "drizzle-orm";
import moment from "moment";
import { AiResultData } from "@/types";
import { useEffect, useState } from "react";

const DashboardHomePage = () => {
  const [data, setData] = useState<AiResultData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const results = await db
        .select()
        .from(AiResult)
        .orderBy(desc(AiResult.createdAt));

      const formattedResults = results.map((result) => ({
        ...result,
        createdAt: moment().format("DD/MM/yyyy"),
      }));

      setData(formattedResults as AiResultData[]);

      console.log("formattedResults", formattedResults[0].createdAt);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>AI Content Generations</CardTitle>
          <CardDescription>Generated in the last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-4xl font-bold">45,231</div>
          <div className="flex items-center gap-1 text-sm font-medium text-primary">
            <ArrowUpIcon className="w-4 h-4" />
            <span>20.1%</span>
          </div>
        </CardContent>
      </Card>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Credits User</CardTitle>
          <CardDescription>AI Credits Userd in last 7 days</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-4xl font-bold">+2,350</div>
          <div className="flex items-center gap-1 text-sm font-medium text-primary">
            <ArrowUpIcon className="w-4 h-4" />
            <span>180.1%</span>
          </div>
        </CardContent>
      </Card>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Chatbot Interactions</CardTitle>
          <CardDescription>In the last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-4xl font-bold">+12,234</div>
          <div className="flex items-center gap-1 text-sm font-medium text-primary">
            <ArrowUpIcon className="w-4 h-4" />
            <span>19%</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>In the last hour</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-4xl font-bold">+573</div>
          <div className="flex items-center gap-1 text-sm font-medium text-primary">
            <ArrowUpIcon className="w-4 h-4" />
            <span>201</span>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 row-span-2 lg:col-span-2 lg:row-span-1">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart className="aspect-[16/9]" />
        </CardContent>
      </Card>
      <Card className="col-span-1 row-span-2 lg:col-span-2 lg:row-span-2">
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
          <CardDescription>By revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart className="aspect-[15/8]" />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHomePage;
