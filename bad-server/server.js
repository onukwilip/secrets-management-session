const express = require("express");
const app = express();

const DB_PASSWORD = "s3cur3P@ssw0rd123";
const STRIPE_KEY = "sk_live_XXXXXXXXXXXX";

app.get("/", (req, res) => {
  res.json({ status: "ok", db: DB_PASSWORD, stripe: STRIPE_KEY });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
