const express = require("express");
const cors = require("cors");
const triviaRouter = require("./trivia.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/trivia", triviaRouter);

app.listen(PORT, () => {
  console.log(`Trivoo backend running on port ${PORT}`);
});
