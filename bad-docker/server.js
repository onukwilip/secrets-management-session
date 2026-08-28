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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
