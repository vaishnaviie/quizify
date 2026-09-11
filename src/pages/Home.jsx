import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [notes, setNotes] = useState("");
  const [questionCount, setQuestionCount] = useState(5);

  const navigate = useNavigate();

  const topics = ["React", "JavaScript", "Core Web Vitals", "Computer Science"];

  const handleTopicClick = (topic) => {
    setNotes(topic);
  };

  const handleGenerateQuiz = () => {
    if (!notes.trim()) {
      return;
    }

    navigate("/quiz", {
      state: {
        notes: notes.trim(),
        questionCount,
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#102F24] px-4 py-4 text-[#F4F0E6] sm:px-6 sm:py-5">
      <div className="mx-auto flex min-h-[96vh] max-w-5xl flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#355345] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C8F169] text-sm font-black text-[#17382B]">
              Q
            </div>

            <span className="text-base font-bold tracking-tight">QUIZLY</span>
          </div>

          <span className="text-[10px] font-semibold tracking-[0.12em] text-[#A9B8AF] sm:text-xs">
            AI STUDY ASSISTANT
          </span>
        </header>

        {/* Main Content */}
        <section className="flex flex-1 flex-col items-center pt-8 pb-8 sm:pt-10">
          {/* Small Label */}
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8F169]" />

            <span className="text-[10px] font-bold tracking-[0.16em] text-[#C8F169]">
              LEARN • TEST • REPEAT
            </span>
          </div>

          {/* Hero Heading */}
          <h1 className="max-w-3xl text-center text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl">
            DON'T JUST READ IT.
            <span className="text-[#C8F169]"> TEST IT.</span>
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-lg text-center text-xs leading-5 text-[#B7C3BC] sm:text-sm">
            Turn your notes or any topic into an interactive quiz.
          </p>

          {/* Input Card */}
          <div className="mt-7 w-full max-w-2xl rounded-3xl border border-[#D7DED7] bg-[#FBFAF5] p-5 shadow-[0_20px_50px_rgba(8,45,32,0.18)] sm:mt-8 sm:p-7">
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <label
                htmlFor="notes"
                className="text-sm font-bold text-[#17382B]"
              >
                What do you want to learn?
              </label>

              <span className="rounded-full bg-[#E8F4D0] px-3 py-1 text-[10px] font-bold tracking-wider text-[#3E6B32]">
                YOUR NOTES
              </span>
            </div>

            {/* Textarea */}
            <div className="mt-3 rounded-2xl border border-[#DDE4DD] bg-[#F3F5EF] p-1 transition focus-within:border-[#8DBB4C] focus-within:ring-4 focus-within:ring-[#DDF0B5]">
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value.slice(0, 1000))}
                placeholder="Paste your notes or enter a topic..."
                className="h-32 w-full resize-none rounded-xl bg-transparent p-4 text-sm leading-6 text-[#17382B] outline-none placeholder:text-[#87958D] sm:h-36"
              />

              <div className="flex justify-end px-4 pb-2">
                <span className="text-[10px] font-medium text-[#8A9890]">
                  {notes.length}/1000
                </span>
              </div>
            </div>

            {/* Question Count */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="questionCount"
                  className="text-sm font-bold text-[#17382B]"
                >
                  Number of questions
                </label>

                {/* <span className="text-xs text-[#7A8A82]">
                  Choose between 1–20
                </span> */}
              </div>

              <input
                id="questionCount"
                type="number"
                min="1"
                max="20"
                value={questionCount}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (value >= 1 && value <= 20) {
                    setQuestionCount(value);
                  }
                }}
                className="mt-2 w-24  rounded-xl border border-[#D7DED7] bg-[#F3F5EF] px-4 py-3 text-sm font-semibold text-[#17382B] outline-none transition focus:border-[#8DBB4C] focus:ring-4 focus:ring-[#DDF0B5]"
              />
            </div>
            {/* Topics */}
            <div className="mt-5">
              <p className="text-sm font-bold text-[#17382B]">Try a topic</p>

              <div className="mt-2 flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => handleTopicClick(topic)}
                    className="cursor-pointer rounded-full border border-[#D7DED7] bg-white px-3 py-1.5 text-xs font-semibold text-[#64736A] transition hover:border-[#9DBA78] hover:bg-[#EFF5E5] hover:text-[#315A3E]"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              type="button"
              onClick={handleGenerateQuiz}
              disabled={!notes.trim()}
              className="group mt-6 flex w-full cursor-pointer items-center justify-between rounded-2xl bg-[#17382B] px-5 py-3.5 text-left text-sm font-bold text-[#F4F0E6] shadow-[0_8px_20px_rgba(23,56,43,0.18)] transition hover:bg-[#204A39] hover:shadow-[0_12px_25px_rgba(23,56,43,0.25)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>Generate Quiz</span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C8F169] text-lg font-bold text-[#17382B] transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#355345] py-3 text-center text-[10px] text-[#82938A]">
          AI-powered learning • Built with React
        </footer>
      </div>
    </main>
  );
}

export default Home;
