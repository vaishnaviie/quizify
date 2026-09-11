function QuizCard({
  question,
  questionNumber,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrevious,
  isLastQuestion,
  onSubmit,
}) {
  return (
    <div className="mt-8 rounded-2xl border border-[#D7DED7] bg-[#FBFAF5] p-6 shadow-[0_20px_50px_rgba(8,45,32,0.18)]">
      <p className="text-sm font-medium text-[#7A8A82]">
        Question {questionNumber}
      </p>

      <h2 className="mt-3 text-xl font-semibold leading-8 text-[#17382B]">
        {question.question}
      </h2>

      <div className="mt-6 space-y-3">
        {question.options.map((option, index) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 text-left text-sm font-medium transition ${
              selectedAnswer === option
                ? "border-[#17382B] bg-[#E8F4D0] text-[#17382B] shadow-sm"
                : "border-[#D7DED7] bg-white text-[#596960] hover:border-[#9DBA78] hover:bg-[#EFF5E5] hover:text-[#315A3E]"
            }`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                selectedAnswer === option
                  ? "bg-[#17382B] text-[#C8F169]"
                  : "bg-[#EEF1EC] text-[#596960]"
              }`}
            >
              {index + 1}
            </span>

            <span>{option}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          onClick={onPrevious}
          disabled={questionNumber === 1}
          className="cursor-pointer rounded-xl border border-[#D7DED7] px-5 py-3 text-sm font-semibold text-[#596960] disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Previous
        </button>

        {isLastQuestion ? (
          <button
            onClick={onSubmit}
            disabled={!selectedAnswer}
            className="cursor-pointer rounded-xl bg-[#17382B] px-6 py-3 text-sm font-semibold text-[#F4F0E6] disabled:cursor-not-allowed disabled:bg-[#AAB5AE]"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!selectedAnswer}
            className="cursor-pointer rounded-xl bg-[#17382B] px-6 py-3 text-sm font-semibold text-[#F4F0E6] disabled:cursor-not-allowed disabled:bg-[#AAB5AE]"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizCard;
