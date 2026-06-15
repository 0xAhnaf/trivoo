import React, { useState, useRef } from "react";
import "./QuestionPage.css";

const QuestionPage = ({ topic, questions, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const scoreRef = useRef(0); // stays in sync for the finish call

  const current = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLast = currentIndex === totalQuestions - 1;

  const handleSelect = (option) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === current.answer) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }
  };

  const handleNext = () => {
    if (isLast) {
      onFinish(scoreRef.current);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const getOptionClass = (option) => {
    if (!answered) return "QP-option";
    if (option === current.answer) return "QP-option correct";
    if (option === selected && option !== current.answer) return "QP-option wrong";
    return "QP-option dimmed";
  };

  const progressPct = (currentIndex / totalQuestions) * 100;

  return (
    <div className="QP-class">
      <div className="QP-card">
        <div className="QP-meta">
          <span className="QP-topic">{topic}</span>
          <span className="QP-counter">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        <div className="QP-progress-bar">
          <div className="QP-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>

        <div className="QP-question">{current.question}</div>

        <div className="QP-options">
          {current.options.map((option, idx) => (
            <button
              key={idx}
              className={getOptionClass(option)}
              onClick={() => handleSelect(option)}
              disabled={answered}
            >
              <span className="QP-option-letter">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="QP-option-text">{option}</span>
            </button>
          ))}
        </div>

        {answered && (
          <div className="QP-feedback">
            {selected === current.answer ? (
              <span className="QP-feedback-correct">Correct! 🎉</span>
            ) : (
              <span className="QP-feedback-wrong">
                Wrong. The answer was: <strong>{current.answer}</strong>
              </span>
            )}
          </div>
        )}

        {answered && (
          <button className="QP-next-button" onClick={handleNext}>
            {isLast ? "See Results →" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
