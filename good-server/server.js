const express = require("express");
const app = express();

const DB_PASSWORD = process.env.DB_PASSWORD;
const STRIPE_KEY = process.env.STRIPE_KEY;

if (!DB_PASSWORD || !STRIPE_KEY) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
