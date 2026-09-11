function Score() {
  const score = 4;
  const totalQuestions = 5;
  const percentage = 80;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 text-slate-900">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-3xl">
            🎉
          </div>

          <p className="mt-5 text-sm font-medium text-indigo-600">
            Quiz Complete
          </p>

          <h1 className="mt-2 text-3xl font-bold">Great job!</h1>

          <p className="mt-2 text-sm text-slate-500">
            Here is how you performed on the quiz.
          </p>

          <div className="mt-8">
            <p className="text-5xl font-bold text-indigo-600">
              {score}/{totalQuestions}
            </p>

            <p className="mt-2 text-lg font-semibold text-slate-700">
              {percentage}%
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-2xl font-bold text-emerald-600">{score}</p>
              <p className="mt-1 text-sm text-slate-500">Correct</p>
            </div>

            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-2xl font-bold text-red-500">
                {totalQuestions - score}
              </p>
              <p className="mt-1 text-sm text-slate-500">Incorrect</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
              Back to Home
            </button>

            <button className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Score;
