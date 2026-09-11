function ErrorState({ onRetry }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#102F24] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#355345] bg-[#FBFAF5] p-8 text-center shadow-[0_20px_50px_rgba(8,45,32,0.18)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FDECEC] text-xl font-bold text-[#B94A48]">
          !
        </div>

        <h1 className="mt-5 text-xl font-bold text-[#17382B]">
          Something went wrong
        </h1>

        <button
          onClick={onRetry}
          className="mt-6 cursor-pointer rounded-xl bg-[#17382B] px-6 py-3 text-sm font-semibold text-[#F4F0E6] transition hover:bg-[#204A39]"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}

export default ErrorState;
