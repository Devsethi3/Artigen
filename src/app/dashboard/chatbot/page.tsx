"use client";

import React, {
  useState,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  useRef,
} from "react";
import { AiOutlineSend } from "react-icons/ai";
import { FiCopy, FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";
import { chatSession } from "@/model/aiModel";
import { db } from "@/lib/db";
import { AiResult } from "@/lib/schema";
import { useUser } from "@clerk/nextjs";
import { useTotalUsage } from "@/context/TotalUsageContext";
import { MAXIMUM_PLAN_USAGE_VALUE } from "@/data/constant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { desc, eq, and, asc } from "drizzle-orm";

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const { totalUsage, setTotalUsage } = useTotalUsage();
  const { user } = useUser();
  const [streaming, setStreaming] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchChatHistory();
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streaming]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatHistory = async () => {
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

      setMessages(chatHistory);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      { text: "", isUser: false },
    ]);
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

    try {
      setStreaming(true);
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
      setStreaming(false);
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

  const CodeBlock = ({
    language,
    value,
  }: {
    language: string;
    value: string;
  }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 bg-gray-800 rounded-md text-white"
        >
          <FiCopy />
        </button>
        <SyntaxHighlighter language={language} style={vscDarkPlus}>
          {value}
        </SyntaxHighlighter>
        {copied && (
          <div className="absolute top-2 right-12 bg-green-500 text-white px-2 py-1 rounded-md">
            Copied!
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[89vh] bg-gray-100 p-4">
      <div className="flex-grow overflow-y-auto bg-white shadow-md rounded-lg p-4 max-w-4xl mb-4">
        {messages.reverse().map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.isUser ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`${
                msg.isUser
                  ? "bg-primary px-3 py-2 max-w-[70%]  text-white rounded-b-lg rounded-tl-lg"
                  : "bg-secondary px-3 py-2 max-w-[70%]  text-black rounded-b-lg rounded-tr-lg"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <CodeBlock
                        language={match[1]}
                        value={String(children).replace(/\n$/, "")}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {streaming && (
          <div className="flex justify-center items-center">
            <FiLoader className="animate-spin" size={24} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-grow"
          disabled={streaming}
        />
        <Button onClick={handleSend} disabled={streaming}>
          <AiOutlineSend size={24} />
        </Button>
      </div>
    </div>
  );
};

export default ChatBotPage;
