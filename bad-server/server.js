const express = require("express");
const app = express();

const DB_PASSWORD = "s3cur3P@ssw0rd123";
const STRIPE_KEY = "sk_live_XXXXXXXXXXXX";

app.get("/", (req, res) => {
  res.json({ status: "ok", db: DB_PASSWORD, stripe: STRIPE_KEY });
});

app.listen(3000, () => console.log("Server running on port 3000"));
