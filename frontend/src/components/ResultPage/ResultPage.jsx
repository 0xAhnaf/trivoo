import React from "react";
import "./ResultPage.css";

const getRemark = (score, total) => {
  const pct = score / total;
  if (pct === 1) return { emoji: "🏆", text: "Perfect score! You're a true fan." };
  if (pct >= 0.8) return { emoji: "🔥", text: "Outstanding! Almost flawless." };
  if (pct >= 0.6) return { emoji: "👏", text: "Solid effort! You know your stuff." };
  if (pct >= 0.4) return { emoji: "🤔", text: "Not bad, but there's room to grow." };
  if (pct >= 0.2) return { emoji: "📚", text: "Time for a rewatch, maybe?" };
  return { emoji: "😅", text: "Rough one. Brush up and try again!" };
};

const ResultPage = ({ topic, score, total, onRestart }) => {
  const { emoji, text } = getRemark(score, total);
  const pct = Math.round((score / total) * 100);

  return (
    <div className="RP-class">
      <div className="RP-card">
        <div className="RP-topic">{topic}</div>
        <div className="RP-emoji">{emoji}</div>
        <div className="RP-score-label">Your Score</div>
        <div className="RP-score">
          {score}<span className="RP-score-total"> / {total}</span>
        </div>
        <div className="RP-pct">{pct}%</div>

        <div className="RP-bar-wrap">
          <div className="RP-bar">
            <div className="RP-bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="RP-remark">{text}</div>

        <button className="RP-restart-button" onClick={onRestart}>
          Try Another Topic
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
