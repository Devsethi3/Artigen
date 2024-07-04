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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AiResultData } from "@/types";

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

  return (
    <div className="container min-h-[90vh] overflow-y-hidden mx-auto p-4">
      <h1 className="text-2xl font-bold">History</h1>
      <p className="mb-6 text-muted-foreground">
        Get your previously generated AI Results
      </p>
      <Table>
        <TableCaption>A list of your AI generation history.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Template</TableHead>
            <TableHead>AI Response</TableHead>
            {/* <TableHead>Date</TableHead> */}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No history available.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.slug}</TableCell>
                <TableCell className="max-w-[500px]">
                  <div className="line-clamp-3">{row.aiResponse}</div>
                </TableCell>
                {/* <TableCell>{row.createdAt}</TableCell> */}
                <TableCell className="text-left">
                  <div className="flex justify-end items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              copyToClipboard(row.aiResponse || "", row.id)
                            }
                          >
                            {copiedRowId === row.id ? (
                              <TbCheck size={18} />
                            ) : (
                              <TbCopy size={18} />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy to Clipboard</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <RiDeleteBin5Fill size={18} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-red-900">
                            This action cannot be undone. This will permanently
                            delete your data and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteRow(row.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HistoryPage;
