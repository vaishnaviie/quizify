function Home() {
  const topics = ["React", "JavaScript", "Core Web Vitals", "Computer Science"];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto flex min-h-[90vh] max-w-4xl flex-col">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              ✦
            </div>

            <span className="text-lg font-bold tracking-tight">Quizly</span>
          </div>

          <span className="text-sm text-slate-500">AI Study Assistant</span>
        </header>

        {/* Hero */}
        <section className="flex flex-1 flex-col items-center justify-center py-16">
          <div className="mb-4 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600">
            ✨ AI-powered learning
          </div>

          <h1 className="max-w-2xl text-center text-4xl font-bold tracking-tight sm:text-5xl">
            Turn your notes into an
            <span className="text-indigo-600"> interactive quiz.</span>
          </h1>

          <p className="mt-5 max-w-xl text-center text-base leading-7 text-slate-500">
            Paste your notes or enter a topic. AI will create a quiz that helps
            you test and improve your knowledge.
          </p>

          {/* Input Card */}
          <div className="mt-10 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              What do you want to learn?
            </label>

            <textarea
              placeholder="Paste your notes or enter a topic..."
              className="h-40 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
            />

            <div className="mt-5">
              <p className="mb-3 text-sm font-semibold text-slate-700">
                Number of questions
              </p>

              <div className="flex gap-2">
                {[5, 8, 10].map((count) => (
                  <button
                    key={count}
                    className="rounded-lg border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-slate-700">
                Try a topic
              </p>

              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <button className="mt-7 w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.99]">
              ✨ Generate Quiz
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">
          AI-powered learning • Built with React
        </footer>
      </div>
    </main>
  );
}

export default Home;
