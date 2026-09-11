function QuizHeader({ currentQuestion, totalQuestions }) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[#C8F169]">Quizify</p>

        <h1 className="mt-1 text-2xl font-bold">Your Quiz</h1>
      </div>

      <p className="text-sm text-[#A9B8AF]">
        Question {currentQuestion} of {totalQuestions}
      </p>
    </header>
  );
}

export default QuizHeader;
