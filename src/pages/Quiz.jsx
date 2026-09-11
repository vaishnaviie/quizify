import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  const quizQuestions = [
    {
      question: "Which of the following is a JavaScript framework?",
      options: ["React", "HTML", "CSS", "Git"],
      correctAnswer: "React",
    },
    {
      question: "Which hook is used to manage state in React?",
      options: ["useEffect", "useState", "useRef", "useMemo"],
      correctAnswer: "useState",
    },
    {
      question: "Which language is used to style web pages?",
      options: ["JavaScript", "Python", "CSS", "Java"],
      correctAnswer: "CSS",
    },
    {
      question: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Advanced Programming Integration",
        "Application Process Interface",
        "Automated Programming Interface",
      ],
      correctAnswer: "Application Programming Interface",
    },
    {
      question: "Which tool is commonly used for version control?",
      options: ["Figma", "Git", "Vite", "React"],
      correctAnswer: "Git",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

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
