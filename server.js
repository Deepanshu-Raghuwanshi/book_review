const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use("/healthcheck", (req, res) =>
  res.send(`server running on port ${port}`)
);

app.listen(port, () => console.log(`Server started on port ${port}`));
