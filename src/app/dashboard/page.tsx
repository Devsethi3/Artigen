"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import LineChart from "@/components/LineChart";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";

export default function Component() {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-4xl font-bold">$45,231</div>
          <div className="flex items-center gap-1 text-sm font-medium text-primary">
            <ArrowUpIcon className="w-4 h-4" />
            <span>20.1%</span>
          </div>
        </CardContent>
      </Card>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>New Customers</CardTitle>
          <CardDescription>Last 7 days</CardDescription>
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
          <CardTitle>Sales</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
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
          <CardTitle>Active Users</CardTitle>
          <CardDescription>Last hour</CardDescription>
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
}

function ArrowUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}
