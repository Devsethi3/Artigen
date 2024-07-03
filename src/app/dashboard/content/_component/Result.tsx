"use client";

import { Button } from "@/components/ui/button";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { TbCopy, TbCheck } from "react-icons/tb";

interface ResultProps {
  content: string;
  isLoading: boolean;
}

const Result: React.FC<ResultProps> = ({ content, isLoading }) => {
  const editorRef = useRef<Editor>(null);
  const [currentContent, setCurrentContent] = useState(
    "Your result will appear here"
  );
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (content) {
      setCurrentContent(content);
    }
  }, [content]);

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      editorInstance.setMarkdown(currentContent);
    }
  }, [currentContent]);

  const copyContent = () => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      const markdown = editorInstance.getMarkdown();
      navigator.clipboard.writeText(markdown);
      setIsCopied(true);
      toast.success("Copied Successfully!");
      setTimeout(() => setIsCopied(false), 1000);
    }
  };

  return (
    <div className="bg-white shadow-lg border relative">
      <div className="flex items-center justify-between p-5">
        <h2 className="text-lg font-semibold">Your Result</h2>
        <Button
          onClick={copyContent}
          disabled={
            isLoading || currentContent === "Your result will appear here"
          }
        >
          {isCopied ? (
            <>
              <TbCheck size={20} className="mr-2" />
              Copied!
            </>
          ) : (
            <>
              <TbCopy size={20} className="mr-2" />
              Copy
            </>
          )}
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue={currentContent}
        previewStyle="vertical"
        height="480px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={() => {
          const editorInstance = editorRef.current?.getInstance();
          if (editorInstance) {
            setCurrentContent(editorInstance.getMarkdown());
          }
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <div className="animate-pulse text-lg font-semibold">
            Generating content...
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
