export function validateQuiz(data, questionCount) {
  if (!data || !Array.isArray(data.questions)) {
    return false;
  }

  if (data.questions.length !== questionCount) {
    return false;
  }

  return data.questions.every((question) => {
    return (
      question &&
      typeof question.question === "string" &&
      question.question.trim() !== "" &&
      Array.isArray(question.options) &&
      question.options.length === 4 &&
      question.options.every(
        (option) => typeof option === "string" && option.trim() !== ""
      ) &&
      typeof question.correctAnswer === "string" &&
      question.correctAnswer.trim() !== "" &&
      question.options.includes(question.correctAnswer) &&
      typeof question.explanation === "string" &&
      question.explanation.trim() !== ""
    );
  });
}
