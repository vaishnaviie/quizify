import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useQuiz from "../hooks/useQuiz";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import ProgressBar from "../components/ProgressBar";
import QuizCard from "../components/QuizCard";
import QuizHeader from "../components/QuizHeader";

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    notes,
    questionCount,
    questions: existingQuestions,
  } = location.state || {};

  const { loading, error, createQuiz } = useQuiz();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizQuestions, setQuizQuestions] = useState(existingQuestions || []);
  const [submitting, setSubmitting] = useState(false);

  const hasGenerated = useRef(false);

  useEffect(() => {
    // If questions already exist, use them.
    // This happens when the user clicks "Retake Quiz".
    if (existingQuestions?.length) {
      return;
    }

    // Generate quiz only when there are no existing questions.
    if (!notes || !questionCount || hasGenerated.current) {
      return;
    }

    hasGenerated.current = true;

    createQuiz(notes, questionCount).then((questions) => {
      if (questions) {
        setQuizQuestions(questions);
      }
    });
  }, [notes, questionCount, existingQuestions]);

  // Loading state
  if (loading) {
    return (
      <LoadingState
        message="Generating your quiz..."
        subMessage="Quizly is creating questions from your notes."
      />
    );
  }

  // submiting quiz
  if (submitting) {
    return (
      <LoadingState
        message="Calculating your score..."
        subMessage="Quizly is calculating your score"
      />
    );
  }

  // Error state
  if (error) {
    return (
      <ErrorState
        onRetry={() => {
          createQuiz(notes, questionCount).then((questions) => {
            if (questions) {
              setQuizQuestions(questions);
            }
          });
        }}
      />
    );
  }

  // Empty state
  if (!quizQuestions || quizQuestions.length === 0) {
    return <EmptyState />;
  }

  const question = quizQuestions[currentQuestion];

  const handleAnswer = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);

    setTimeout(() => {
      let score = 0;

      quizQuestions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
          score++;
        }
      });

      navigate("/score", {
        state: {
          score,
          totalQuestions: quizQuestions.length,
          notes,
          questionCount,
          questions: quizQuestions,
        },
      });
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#102F24] px-4 py-8 text-[#F4F0E6]">
      <div className="mx-auto max-w-3xl">
        <QuizHeader
          currentQuestion={currentQuestion + 1}
          totalQuestions={quizQuestions.length}
        />

        <ProgressBar
          currentQuestion={currentQuestion}
          totalQuestions={quizQuestions.length}
        />

        <QuizCard
          question={question}
          questionNumber={currentQuestion + 1}
          selectedAnswer={answers[currentQuestion]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isLastQuestion={currentQuestion === quizQuestions.length - 1}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}

export default Quiz;
