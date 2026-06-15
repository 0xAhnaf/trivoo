import React, { useState } from "react";
import "./LandingPage.css";

const LandingPage = ({ onStart }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    const topic = input.trim();
    if (!topic) {
      setError("Please enter a topic first.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/trivia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
        return;
      }

      onStart(data.topic, data.questions);
    } catch (err) {
      setError("Could not reach the server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleGenerate();
  };

  return (
    <div className="Landing-class">
      <div className="Landing-content">
        <div className="Landing-text-header">
          Your ultimate trivia challenge.
        </div>
        <div className="Landing-text-body">
          Type a movie, TV series, song, or celebrity — get 10 questions
          instantly.
        </div>

        <div className="Landing-input-row">
          <input
            type="text"
            className="Landing-input-field"
            placeholder="e.g. Breaking Bad, Taylor Swift, Inception..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            className="Landing-input-button"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate!"}
          </button>
        </div>

        {error && <div className="Landing-error">{error}</div>}

        {loading && (
          <div className="Landing-loading">
            <div className="Landing-loading-bar">
              <div className="Landing-loading-fill" />
            </div>
            <p className="Landing-loading-text">Cooking up your trivia...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
