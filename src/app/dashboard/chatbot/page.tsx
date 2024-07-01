"use client";

import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { AiOutlineSend } from "react-icons/ai";
import toast from "react-hot-toast";
import { chatSession } from "@/model/aiModel";
import { db } from "@/lib/db";
import { AiResult } from "@/lib/schema";
import { useUser } from "@clerk/nextjs";
import { useTotalUsage } from "@/context/TotalUsageContext";
import { MAXIMUM_PLAN_USAGE_VALUE } from "@/data/constant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RiLoader2Fill } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { desc, eq } from "drizzle-orm";
import { format } from "date-fns";

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const { totalUsage, setTotalUsage } = useTotalUsage();
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchChatHistory();
  }, [user]);

  const fetchChatHistory = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const results = await db
        .select()
        .from(AiResult)
        .where(eq(AiResult.slug, "chatbot"))
        .where(eq(AiResult.createdBy, user.primaryEmailAddress.emailAddress))
        .orderBy(desc(AiResult.createdAt));

      const chatHistory: Message[] = results.flatMap((result) => {
        const formData = JSON.parse(result.formData);
        return [
          { text: formData.input, isUser: true },
          { text: result.aiResponse || "", isUser: false },
        ];
      });

      setMessages(chatHistory);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    generateAIContent({ input });
    setInput("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const generateAIContent = async (formData: Record<string, string>) => {
    if (totalUsage >= MAXIMUM_PLAN_USAGE_VALUE) {
      toast((t) => (
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

    try {
      const finalAIPrompt = `${JSON.stringify(formData)}`;

      const result = await chatSession.sendMessage(finalAIPrompt);
      const responseText = await result.response.text();

      const aiMessage: Message = { text: responseText, isUser: false };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

      await saveInDatabase(formData, responseText);

      setTotalUsage((prev: number) => prev + responseText.length);
    } catch (error) {
      console.error("Error generating AI content:", error);
      const errorMessage: Message = {
        text: "An error occurred while generating content. Please try again.",
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const saveInDatabase = async (
    formData: Record<string, string>,
    aiResult: string
  ) => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    await db.insert(AiResult).values({
      formData: JSON.stringify(formData),
      slug: "chatbot",
      aiResponse: aiResult,
      createdBy: user.primaryEmailAddress.emailAddress,
      createdAt: new Date(),
    });
  };

  return (
    <div className="flex flex-col h-[89vh] bg-gray-100 p-4">
      <div className="flex-grow overflow-y-auto bg-white shadow-md rounded-lg p-4 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.isUser ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`px-3 py-2 ${
                msg.isUser
                  ? "bg-primary text-white rounded-b-lg rounded-tl-lg"
                  : "bg-secondary text-black rounded-b-lg rounded-tr-lg"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                className="prose"
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-center mb-2">
            <RiLoader2Fill className="animate-spin h-5 w-5" />
          </div>
        )}
      </div>
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-grow"
        />
        <Button onClick={handleSend}>
          <AiOutlineSend size={24} />
        </Button>
      </div>
    </div>
  );
};

export default ChatBotPage;
