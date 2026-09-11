import { useLocation, useNavigate } from "react-router-dom";

function Score() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, totalQuestions, notes, questionCount, questions } =
    location.state || {};

  if (score === undefined || totalQuestions === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#102F24] px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#F4F0E6]">
            No quiz result found
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

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#102F24] px-4 py-8 text-[#F4F0E6]">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-[#D7DED7] bg-[#FBFAF5] p-8 text-center shadow-[0_20px_50px_rgba(8,45,32,0.18)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F4D0] text-3xl">
            🎉
          </div>

          <p className="mt-5 text-sm font-medium text-[#5F8A38]">
            Quiz Complete
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#17382B]">Great job!</h1>

          <p className="mt-2 text-sm text-[#7A8A82]">
            Here is how you performed on the quiz.
          </p>

          <div className="mt-8">
            <p className="text-5xl font-bold text-[#315A3E]">
              {score}/{totalQuestions}
            </p>

            <p className="mt-2 text-lg font-semibold text-[#596960]">
              {percentage}%
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-[#E8F4D0] p-4">
              <p className="text-2xl font-bold text-[#4F7D35]">{score}</p>

              <p className="mt-1 text-sm text-[#68766E]">Correct</p>
            </div>

            <div className="rounded-xl bg-[#FDECEC] p-4">
              <p className="text-2xl font-bold text-[#B94A48]">
                {totalQuestions - score}
              </p>

              <p className="mt-1 text-sm text-[#68766E]">Incorrect</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer rounded-xl border border-[#D7DED7] px-6 py-3 text-sm font-semibold text-[#596960] transition hover:bg-[#F0F3EC]"
            >
              Back to Home
            </button>

            <button
              onClick={() =>
                navigate("/quiz", {
                  state: {
                    notes,
                    questionCount,
                    questions,
                  },
                })
              }
              className="cursor-pointer rounded-xl bg-[#17382B] px-6 py-3 text-sm font-semibold text-[#F4F0E6] transition hover:bg-[#204A39]"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Score;
