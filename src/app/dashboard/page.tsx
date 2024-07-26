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
import { ArrowUpIcon } from "lucide-react";
import { db } from "@/lib/db";
import { AiResult } from "@/lib/schema";
import { and, asc, desc, eq } from "drizzle-orm";
import moment from "moment";
import { AiResultData, Message } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useTotalUsage } from "@/context/TotalUsageContext";
import { useUser } from "@clerk/nextjs";
import CountUp from "react-countup";

const DashboardHomePage = () => {
  const [data, setData] = useState<AiResultData[]>([]);
  const [loading, setLoading] = useState(true);
  const { totalUsage, setTotalUsage } = useTotalUsage();
  const { user } = useUser();
  const [totalChatbotInteractions, setTotalChatbotInteractions] = useState(0);
  const [chatbotInteractionsData, setChatbotInteractionsData] = useState<
    { date: string; count: number }[]
  >([]);
  const [aiGenerationsData, setAiGenerationsData] = useState<
    { date: string; count: number }[]
  >([]);

  const fetchData = async () => {
    try {
      const results = await db
        .select()
        .from(AiResult)
        .orderBy(desc(AiResult.createdAt));

      const formattedResults: AiResultData[] = results.map((result) => ({
        ...result,
        createdAt: moment(result.createdAt).format("DD/MM/yyyy"),
      }));

      setData(formattedResults);

      // Prepare data for the graph
      const generationsByDate = formattedResults.reduce((acc, result) => {
        const date = moment(result.createdAt, "DD/MM/yyyy").format(
          "YYYY-MM-DD"
        );
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      setAiGenerationsData(
        Object.entries(generationsByDate).map(([date, count]) => ({
          date,
          count,
        }))
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      if (!user?.primaryEmailAddress?.emailAddress) return;
      const results = await db
        .select()
        .from(AiResult)
        .where(eq(AiResult.createdBy, user.primaryEmailAddress.emailAddress));

      // @ts-ignore
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

  const fetchChatHistory = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const results = await db
        .select()
        .from(AiResult)
        .where(
          and(
            eq(AiResult.slug, "chatbot"),
            eq(AiResult.createdBy, user.primaryEmailAddress.emailAddress)
          )
        )
        .orderBy(asc(AiResult.createdAt));

      const chatHistory: Message[] = results.flatMap((result) => {
        try {
          const formData = JSON.parse(result.formData as string);
          return [
            { text: formData.input as string, isUser: true },
            { text: result.aiResponse || "", isUser: false },
          ];
        } catch (error) {
          console.error("Error parsing formData:", error);
          return [];
        }
      });

      setTotalChatbotInteractions(chatHistory.length / 2);
  
      const interactionsByDate = results.reduce((acc, result) => {
        const date = moment(result.createdAt).format("YYYY-MM-DD");
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      setChatbotInteractionsData(
        Object.entries(interactionsByDate).map(([date, count]) => ({
          date,
          count,
        }))
      );
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchData();
      getData();
      fetchChatHistory();
      const intervalId = setInterval(() => {
        fetchData();
        getData();
        fetchChatHistory();
      }, 10000);

      return () => clearInterval(intervalId);
    }
  }, [user, fetchChatHistory]);

  const totalAiGenerations = data.length;
  const lastHourSessions = data.filter((result) =>
    moment(result.createdAt, "DD/MM/yyyy").isAfter(moment().subtract(1, "hour"))
  ).length;

  // Placeholder previous data for calculations
  const previousAiGenerations = 37692;
  const previousCreditsUsed = 838;
  const previousChatbotInteractions = 10289;
  const previousSessions = 191;

  // Calculate percentage changes
  const percentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const aiGenerationsPercentage = percentageChange(
    totalAiGenerations,
    previousAiGenerations
  ).toFixed(1);
  const creditsUsedPercentage = percentageChange(
    totalUsage,
    previousCreditsUsed
  ).toFixed(1);
  const chatbotInteractionsPercentage = percentageChange(
    totalChatbotInteractions,
    previousChatbotInteractions
  ).toFixed(1);
  const sessionsPercentage = percentageChange(
    lastHourSessions,
    previousSessions
  ).toFixed(1);

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>AI Content Generations</CardTitle>
          <CardDescription>Generated in the last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-4xl font-bold">
            <CountUp end={totalAiGenerations} duration={2} separator="," />
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-primary">
            <ArrowUpIcon className="w-4 h-4" />
            <span>20.4%</span>
          </div>
        </CardContent>
      </Card>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Credits Used</CardTitle>
          <CardDescription>AI Credits Used in last 7 days</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-4xl font-bold">
            <CountUp end={totalUsage} duration={2} separator="," />
          </div>
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
          <div className="text-4xl font-bold">
            <CountUp
              end={totalChatbotInteractions}
              duration={2}
              separator=","
            />
          </div>
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
          <div className="text-4xl font-bold">
            <CountUp end={lastHourSessions} duration={2} separator="," />
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-primary">
            <ArrowUpIcon className="w-4 h-4" />
            <span>201%</span>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 row-span-2 lg:col-span-2 lg:row-span-1">
        <CardHeader>
          <CardTitle>Chatbot Interactions</CardTitle>
          <CardDescription>Last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart className="aspect-[16/9]" />
        </CardContent>
      </Card>
      <Card className="col-span-1 row-span-2 lg:col-span-2 lg:row-span-2">
        <CardHeader>
          <CardTitle>AI Content Generations</CardTitle>
          <CardDescription>By date</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart className="aspect-[15/8]" />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHomePage;
