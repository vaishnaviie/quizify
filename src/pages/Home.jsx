import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import QuizSetup from "../components/QuizSetup";
import Footer from "../components/Footer";

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
        <Header />

        <QuizSetup
          notes={notes}
          setNotes={setNotes}
          questionCount={questionCount}
          setQuestionCount={setQuestionCount}
          topics={topics}
          onTopicClick={handleTopicClick}
          onGenerate={handleGenerateQuiz}
        />

        <Footer />
      </div>
    </main>
  );
}

export default Home;
