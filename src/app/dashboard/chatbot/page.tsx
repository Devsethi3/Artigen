"use client";

import React, {
  useState,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  useRef,
  useCallback,
} from "react";
import { AiOutlineSend } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
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
import { eq, and, asc } from "drizzle-orm";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Message } from "@/types";

const ChatBotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const { totalUsage, setTotalUsage } = useTotalUsage();
  const { user } = useUser();
  const router = useRouter();
  const [streaming, setStreaming] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

      setMessages(chatHistory);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = useCallback(() => {
    if (input.trim() === "") return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      { text: "", isUser: false, isLoading: true },
    ]);
    generateAIContent({ input });
    setInput("");
  }, [input]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSend();
      }
    },
    [handleSend]
  );

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const generateAIContent = useCallback(
    async (formData: Record<string, string>) => {
      if (totalUsage >= MAXIMUM_PLAN_USAGE_VALUE) {
        toast((t) => (
          <div className="flex items-center">
            <div className="flex-grow">
              <p className="font-bold">Upgrade to Premium</p>
              <p className="text-sm">You have reached your usage limit.</p>
            </div>
            <Button size="sm" onClick={() => router.push("/dashboard/pricing")}>
              Get Premium
            </Button>
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
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1 ? aiMessage : msg
          )
        );

        await saveInDatabase(formData, responseText);

        setTotalUsage((prev: number) => prev + responseText.length);
      } catch (error) {
        console.error("Error generating AI content:", error);
        const errorMessage: Message = {
          text: "An error occurred while generating content. Please try again.",
          isUser: false,
        };
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1 ? errorMessage : msg
          )
        );
      } finally {
        setStreaming(false);
      }
    },
    [totalUsage, router, setTotalUsage]
  );

  const saveInDatabase = useCallback(
    async (formData: Record<string, string>, aiResult: string) => {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      await db.insert(AiResult).values({
        formData: JSON.stringify(formData),
        slug: "chatbot",
        aiResponse: aiResult,
        createdBy: user.primaryEmailAddress.emailAddress,
        createdAt: new Date(),
      });
    },
    [user]
  );

  const CodeBlock = React.memo(
    ({ language, value }: { language: string; value: string }) => {
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
    }
  );

  CodeBlock.displayName = "CodeBlock";

  return (
    <div className="flex flex-col h-[89vh] bg-gray-100 lg:p-4 p-0">
      <div className="flex-grow overflow-y-auto bg-white lg:shadow-md lg:rounded-lg lg:p-4 p-1 w-full mb-4">
        {messages.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center flex-col">
            <Image
              src="/empty-chat.svg"
              width={200}
              height={200}
              alt="empty-chat"
            />
            <div className="text-center text-gray-500 py-4">
              Start a conversation by typing a message.
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end ${
                msg.isUser ? "justify-end" : "justify-start"
              } mb-2`}
            >
              {!msg.isUser && (
                <div className="flex-shrink-0 mr-2">
                  <Image
                    src="/logo.png"
                    alt="AI Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              )}
              <div
                className={`px-3 py-2 max-w-[70%] break-words ${
                  msg.isUser
                    ? "bg-primary text-white rounded-t-lg rounded-bl-lg"
                    : "bg-secondary text-gray-800 rounded-t-lg rounded-br-lg"
                }`}
              >
                {msg.isLoading ? (
                  <div className="skeleton-loader lg:w-64 w-40 h-6">
                    <div className="bg-white animate-pulse w-full h-full p-2 rounded-lg"></div>
                  </div>
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      // @ts-ignore
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
                )}
              </div>
              {msg.isUser && user && (
                <div className="flex-shrink-0 ml-2">
                  <Image
                    src={user.imageUrl || ""}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-4 mx-4">
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
          Send
          <AiOutlineSend className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ChatBotPage);
