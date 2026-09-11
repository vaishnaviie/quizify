import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useQuiz from "../hooks/useQuiz";

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
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Generating your quiz...
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            AI is creating questions from your notes.
          </p>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl">
            !
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">{error}</p>

          <button
            onClick={() => {
              if (notes && questionCount) {
                createQuiz(notes, questionCount).then((questions) => {
                  if (questions) {
                    setQuizQuestions(questions);
                  }
                });
              }
            }}
            className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // Empty state
  if (!quizQuestions || quizQuestions.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900">
            No quiz questions found
          </h1>

          <button
            onClick={() => navigate("/")}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
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
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-600">Quizly</p>

            <h1 className="mt-1 text-2xl font-bold">Your Quiz</h1>
          </div>

          <p className="text-sm text-slate-500">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
        </header>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all"
            style={{
              width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
            }}
          />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Question {currentQuestion + 1}
          </p>

          <h2 className="mt-3 text-xl font-semibold leading-8">
            {question.question}
          </h2>

          <div className="mt-6 space-y-3">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full rounded-xl border p-4 text-left text-sm font-medium transition ${
                  answers[currentQuestion] === option
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>

            {currentQuestion === quizQuestions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!answers[currentQuestion]}
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Quiz;
