function ProgressBar({ currentQuestion, totalQuestions }) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#355345]">
      <div
        className="h-full rounded-full bg-[#C8F169] transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ProgressBar;
