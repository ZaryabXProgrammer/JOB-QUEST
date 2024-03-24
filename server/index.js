const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require('cors')
dotenv.config();
const authRouter = require('./routes/Auth')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => {
    console.log(err);
  });



app.use("/auth", authRouter)




const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server runs perfectly on http://localhost:${PORT}`);
});
