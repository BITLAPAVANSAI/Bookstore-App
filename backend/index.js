import express from "express";
import mongoose from "mongoose";
import router from "./routes/booksroute.js";
import cors from "cors"
const port = process.env.PORT || 5000;
const monogoUri = "mongodb://localhost:27017";
const app = express();
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
  res.status(234).send('Welcome to MERN stack Tutorial')
})


app.use("/books",router)

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`App is connected at ${port}`);
    });
  await mongoose.connect(monogoUri, { family: 4 });
    console.log("Success:" + "connected to Database");
  } catch (error) {
    console.log("Error:" + error);
  }
};

start();


