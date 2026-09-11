function EmptyState({ onBack }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#102F24] px-4">
      <div className="text-center">
        <h1 className="text-xl font-bold text-[#F4F0E6]">
          No quiz questions found
        </h1>

        <button
          onClick={onBack}
          className="mt-5 cursor-pointer rounded-xl bg-[#C8F169] px-5 py-3 text-sm font-semibold text-[#17382B] transition hover:bg-[#B8E45A]"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}

export default EmptyState;
