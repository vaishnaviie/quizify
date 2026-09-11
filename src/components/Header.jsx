function Header() {
  return (
    <header className="flex items-center justify-between border-b border-[#355345] pb-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C8F169] text-sm font-black text-[#17382B]">
          Q
        </div>

        <span className="text-base font-bold tracking-tight">QUIZIFY</span>
      </div>

      <span className="text-[10px] font-semibold tracking-[0.12em] text-[#A9B8AF] sm:text-xs">
        AI STUDY ASSISTANT
      </span>
    </header>
  );
}

export default Header;
