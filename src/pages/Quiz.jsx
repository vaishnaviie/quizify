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
      <main className="flex min-h-screen items-center justify-center bg-[#102F24] px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#355345] border-t-[#C8F169]" />

          <h1 className="mt-5 text-xl font-bold text-[#F4F0E6]">
            Generating your quiz...
          </h1>

          <p className="mt-2 text-sm text-[#A9B8AF]">
            Quizify is creating questions from your notes.
          </p>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#102F24] px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#355345] bg-[#FBFAF5] p-8 text-center shadow-[0_20px_50px_rgba(8,45,32,0.18)]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FDECEC] text-xl font-bold text-[#B94A48]">
            !
          </div>

          <h1 className="mt-5 text-xl font-bold text-[#17382B]">
            Something went wrong
          </h1>

          {/* <p className="mt-2 text-sm leading-6 text-[#68766E]">{error}</p> */}

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
            className="mt-6 cursor-pointer rounded-xl bg-[#17382B] px-6 py-3 text-sm font-semibold text-[#F4F0E6] transition hover:bg-[#204A39]"
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
      <main className="flex min-h-screen items-center justify-center bg-[#102F24] px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-[#F4F0E6]">
            No quiz questions found
          </h1>

          <button
            onClick={() => navigate("/")}
            className="mt-5 cursor-pointer rounded-xl bg-[#C8F169] px-5 py-3 text-sm font-semibold text-[#17382B] transition hover:bg-[#B8E45A]"
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
    <main className="min-h-screen bg-[#102F24] px-4 py-8 text-[#F4F0E6]">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#C8F169]">Quizly</p>

            <h1 className="mt-1 text-2xl font-bold">Your Quiz</h1>
          </div>

          <p className="text-sm text-[#A9B8AF]">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
        </header>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#355345]">
          <div
            className="h-full rounded-full bg-[#C8F169] transition-all"
            style={{
              width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
            }}
          />
        </div>

        <div className="mt-8 rounded-2xl border border-[#D7DED7] bg-[#FBFAF5] p-6 shadow-[0_20px_50px_rgba(8,45,32,0.18)]">
          <p className="text-sm font-medium text-[#7A8A82]">
            Question {currentQuestion + 1}
          </p>

          <h2 className="mt-3 text-xl font-semibold leading-8 text-[#17382B]">
            {question.question}
          </h2>

          <div className="mt-6 space-y-3">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full cursor-pointer rounded-xl border p-4 text-left text-sm font-medium transition ${
                  answers[currentQuestion] === option
                    ? "border-[#17382B] bg-[#E8F4D0] text-[#17382B] shadow-sm"
                    : "border-[#D7DED7] bg-white text-[#596960] hover:border-[#9DBA78] hover:bg-[#EFF5E5] hover:text-[#315A3E]"
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
              className="cursor-pointer rounded-xl border border-[#D7DED7] px-5 py-3 text-sm font-semibold text-[#596960] transition hover:bg-[#F0F3EC] hover:border-[#17382B] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>

            {currentQuestion === quizQuestions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!answers[currentQuestion]}
                className="cursor-pointer rounded-xl bg-[#17382B] px-6 py-3 text-sm font-semibold text-[#F4F0E6] transition hover:bg-[#204A39] disabled:cursor-not-allowed disabled:bg-[#AAB5AE]"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
                className="cursor-pointer rounded-xl bg-[#17382B] px-6 py-3 text-sm font-semibold text-[#F4F0E6] transition hover:bg-[#204A39] disabled:cursor-not-allowed disabled:bg-[#AAB5AE]"
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
