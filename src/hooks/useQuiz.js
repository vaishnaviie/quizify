import { useState, useRef } from "react";
import { generateQuiz } from "../services/api";
import { validateQuiz } from "../utils/validation";

function useQuiz() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestIdRef = useRef(0);

  const createQuiz = async (notes, questionCount) => {
    const requestId = ++requestIdRef.current;

    try {
      setLoading(true);
      setError("");
      setQuestions([]);

      const result = await generateQuiz(notes, questionCount);

      let parsedData;

      try {
        parsedData = JSON.parse(result.data);
      } catch {
        throw new Error("AI returned an invalid response. Please try again.");
      }

      if (requestId !== requestIdRef.current) {
        return;
      }

      if (!validateQuiz(parsedData, questionCount)) {
        throw new Error(
          "AI returned an invalid quiz format. Please try again."
        );
      }

      setQuestions(parsedData.questions);

      return parsedData.questions;
    } catch (error) {
      console.error("Quiz generation error:", error);

      if (requestId !== requestIdRef.current) {
        return;
      }

      setError(error.message || "Failed to generate quiz");
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  };

  return {
    questions,
    loading,
    error,
    createQuiz,
  };
}

export default useQuiz;
