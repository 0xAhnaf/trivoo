# Trivoo 🎯

Trivoo is a full-stack trivia web app that generates instant, AI-powered trivia questions on **any topic** — a movie, TV series, song, or celebrity. Just type a topic and get 10 unique multiple-choice questions in seconds.

**Live demo:** [https://trivoo-frontend.onrender.com/](https://trivoo-frontend.onrender.com/)

> ⚠️ Note: the backend is hosted on Render's free tier, so it may take 30–60 seconds to spin up on the first request after a period of inactivity.

## Features

- 🔎 Enter any topic — movie, TV show, song, or celebrity
- 🤖 10 AI-generated trivia questions per topic, with a mix of easy, medium, and hard difficulty
- ✅ Multiple-choice format with instant feedback
- 📊 Score summary at the end of each round
- 🔁 Restart and try a new topic anytime
- ⚡ Fast responses powered by Groq's LLM inference

## Tech Stack

**Frontend**
- React 19 (Vite)
- Plain CSS
- ESLint

**Backend**
- Node.js + Express
- Groq API (via the OpenAI SDK, `llama-3.3-70b-versatile` model)
- CORS, dotenv

## Project Structure

```
trivoo/
├── frontend/                # React + Vite client
│   └── src/
│       ├── components/
│       │   ├── Navbar/
│       │   ├── LandingPage/    # Topic input screen
│       │   ├── QuestionPage/   # Quiz-taking screen
│       │   └── ResultPage/     # Score summary screen
│       ├── App.jsx
│       └── main.jsx
└── backend/                 # Express API server
    ├── server.js            # App entry point
    └── trivia.js            # /api/trivia route — talks to Groq
```

## How It Works

1. The user enters a topic on the landing page.
2. The frontend sends a `POST` request to the backend's `/api/trivia` endpoint with the topic.
3. The backend calls the Groq API with a system prompt instructing it to return exactly 10 trivia questions as structured JSON (question, 4 options, and the correct answer).
4. The backend parses and validates the AI response, then sends the questions back to the frontend.
5. The user answers each question, and a final score is calculated and shown on the results page.

## Getting Started Locally

### Prerequisites

- Node.js (v18 or later recommended)
- A [Groq API key](https://console.groq.com/keys)

### 1. Clone the repository

```bash
git clone https://github.com/shahipeasant/trivoo.git
cd trivoo
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

Start the backend server:

```bash
npm run dev     # with nodemon, for development
# or
npm start       # plain node
```

The API will be available at `http://localhost:5000`.

### 3. Set up the frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

> The frontend is currently configured to call the backend at `http://localhost:5000/api/trivia`. Update this URL in `LandingPage.jsx` if you deploy the backend elsewhere.

## API Reference

### `POST /api/trivia`

Generates 10 trivia questions for a given topic.

**Request body**
```json
{
  "topic": "Breaking Bad"
}
```

**Response**
```json
{
  "topic": "Breaking Bad",
  "questions": [
    {
      "question": "What is the name of Walter White's alter ego?",
      "options": ["Heisenberg", "Saul", "Skyler", "Jesse"],
      "answer": "Heisenberg"
    }
    // ...9 more questions
  ]
}
```

**Error responses**
- `400` – Missing or invalid `topic`
- `500` – Failed to generate or parse trivia from the AI response

## Deployment

- **Frontend:** deployed on [Render](https://render.com) as a static site → [trivoo-frontend.onrender.com](https://trivoo-frontend.onrender.com/)
- **Backend:** deployed on Render as a web service, with `GROQ_API_KEY` and `PORT` set as environment variables

## Security Note

Never commit your `.env` file or expose your `GROQ_API_KEY` publicly. The `.gitignore` in `backend/` already excludes `.env` and `node_modules/` — keep it that way, and rotate any key that may have been exposed.

## License

This project is open source and available for personal or educational use.
