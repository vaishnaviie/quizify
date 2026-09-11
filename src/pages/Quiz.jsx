function Quiz() {
  const question = {
    question: "Which of the following is a JavaScript framework?",
    options: ["React", "HTML", "CSS", "Git"],
  };

  const currentQuestion = 0;
  const totalQuestions = 5;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-600">Quizly</p>

            <h1 className="mt-1 text-2xl font-bold">Your Quiz</h1>
          </div>

          <p className="text-sm text-slate-500">
            Question {currentQuestion + 1} of {totalQuestions}
          </p>
        </header>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-600"
            style={{
              width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
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
                className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50"
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              disabled
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 opacity-40"
            >
              ← Previous
            </button>

            <button className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
              Next →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Quiz;
