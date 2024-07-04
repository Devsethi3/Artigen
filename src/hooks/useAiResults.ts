import { useState, useEffect } from "react";
import { AiResult } from "@/lib/schema"; // Adjust this import based on your project structure

type AiResultType = typeof AiResult.$inferSelect;

interface AiResultsHookReturn {
  aiResults: AiResultType[];
  loading: boolean;
  error: Error | null;
}

const useAiResults = (): AiResultsHookReturn => {
  const [aiResults, setAiResults] = useState<AiResultType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAiResults = async () => {
      try {
        const response = await fetch("/api/ai-results");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: AiResultType[] = await response.json();
        console.log("Fetched data:", data); // Add this line
        setAiResults(data);
      } catch (error) {
        console.error("Fetch error:", error); // Add this line
        setError(
          error instanceof Error
            ? error
            : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAiResults();
  }, []);

  return { aiResults, loading, error };
};

export default useAiResults;
