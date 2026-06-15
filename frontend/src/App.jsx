import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import ResultPage from "./components/ResultPage/ResultPage";

function App() {
  // screen: "landing" | "question" | "result"
  const [screen, setScreen] = useState("landing");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const handleStart = (fetchedTopic, fetchedQuestions) => {
    setTopic(fetchedTopic);
    setQuestions(fetchedQuestions);
    setScore(0);
    setScreen("question");
  };

  const handleFinish = (finalScore) => {
    setScore(finalScore);
    setScreen("result");
  };

  const handleRestart = () => {
    setTopic("");
    setQuestions([]);
    setScore(0);
    setScreen("landing");
  };

  return (
    <>
      <Navbar />
      {screen === "landing" && <LandingPage onStart={handleStart} />}
      {screen === "question" && (
        <QuestionPage
          topic={topic}
          questions={questions}
          onFinish={handleFinish}
        />
      )}
      {screen === "result" && (
        <ResultPage
          topic={topic}
          score={score}
          total={questions.length}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App;
