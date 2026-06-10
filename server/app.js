require("dotenv").config();

const express = require("express");
const cors = require("cors");

const uploadRouter = require("./routes/upload");
const askRouter = require("./routes/ask");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/upload", uploadRouter);
app.use("/api/ask", askRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});