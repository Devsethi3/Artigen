"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import { AiResult } from "@/lib/schema";
import { db } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TbCopy, TbCheck } from "react-icons/tb";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [copiedRowId, setCopiedRowId] = useState<number | null>(null);

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

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedRowId(id);
        setTimeout(() => setCopiedRowId(null), 1000);
        toast.success("Copied successfully!");
      })
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
      <td className="px-4 py-3 sm:px-6">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </td>
      <td className="px-4 py-3 sm:px-6">
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </td>
      <td className="px-4 py-3 sm:px-6">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </td>
      <td className="px-4 py-3 sm:px-6">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </td>
    </tr>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">History</h1>
      <p className="mb-6 text-muted-foreground">
        Get your previously generated AI Results
      </p>
      <div className="overflow-x-auto shadow-md border rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Template
              </th>
              <th className="px-4 py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                AI Response
              </th>
              <th className="px-4 py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Date
              </th>
              <th className="px-4 py-3 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
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
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-3 sm:px-6 whitespace-nowrap text-center text-sm text-gray-500"
                >
                  No history available.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 sm:px-6 text-sm text-gray-900">
                    <div className="font-medium">{row.slug}</div>
                  </td>
                  <td className="px-4 py-3 sm:px-6 text-sm text-gray-500">
                    <div className="line-clamp-2">{row.aiResponse}</div>
                  </td>
                  <td className="px-4 py-3 sm:px-6 text-sm text-gray-500">
                    {row.createdAt}
                  </td>
                  <td className="px-4 py-3 sm:px-6 text-sm font-medium">
                    <div className="flex space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() =>
                                copyToClipboard(row.aiResponse || "", row.id)
                              }
                              className="bg-indigo-100 text-indigo-600 transition p-2 rounded-md duration-150 ease-in-out"
                            >
                              {copiedRowId === row.id ? (
                                <TbCheck size={18} />
                              ) : (
                                <TbCopy size={18} />
                              )}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy to Clipboard</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="bg-red-100 p-2 rounded-md text-red-600 transition duration-150 ease-in-out">
                            <RiDeleteBin5Fill size={18} />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button
                              variant="destructive"
                              onClick={() => deleteRow(row.id)}
                            >
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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
