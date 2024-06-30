"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import { AiResult } from "@/lib/schema";
import { db } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { RiDeleteBin5Fill } from "react-icons/ri";

interface AiResultData {
  id: number;
  formData: string;
  aiResponse: string | null;
  slug: string;
  createdBy: string;
  createdAt: string;
}

const HistoryPage: React.FC = () => {
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .catch((err) => console.error("Failed to copy:", err));
  };

  const deleteRow = async (id: number) => {
    try {
      await db.delete(AiResult).where(eq(AiResult.id, id));
      setData(data.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  const SkeletonRow = () => (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </td>
    </tr>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">History</h1>
      <div className="overflow-x-auto shadow-md border rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Template
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                AI Response
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="">
                  <td className="px-6 py-4 w-1/5 whitespace-nowrap text-sm text-gray-900">
                    {row.slug}
                  </td>
                  <td className="px-6 py-4 text-sm w-1/2 text-gray-500">
                    <div className="line-clamp-3">{row.aiResponse}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => copyToClipboard(row.aiResponse || "")}
                      className="text-blue-600 hover:text-blue-900 transition duration-150 ease-in-out mr-8"
                    >
                      Copy
                    </button>
                    <Button variant="destructive" size="icon">
                      <RiDeleteBin5Fill className="" />
                      {/* Delete */}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
