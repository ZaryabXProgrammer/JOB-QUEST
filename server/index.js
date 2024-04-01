const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
dotenv.config();
const authRouter = require("./routes/Auth");
const jobsRouter = require("./routes/Jobs");
const resumeRouter = require("./routes/Resume");
const appliedJobRouter = require("./routes/AppliedJobs");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => {
    console.log(err);
  });

app.use("/auth", authRouter);

app.use("/jobs", jobsRouter);

app.use("/api", resumeRouter);

app.use("/applied", appliedJobRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server runs perfectly on http://localhost:${PORT}`);
});
