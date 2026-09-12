function LoadingState({ message, subMessage }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#102F24] px-4">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#355345] border-t-[#C8F169]" />

        <h1 className="mt-5 text-xl font-bold text-[#F4F0E6]">{message}</h1>

        <p className="mt-2 text-sm text-[#A9B8AF]">{subMessage}</p>
      </div>
    </main>
  );
}

export default LoadingState;
