import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import { dbConnection } from "./dbConfig/dbConnection.js";
import morgan from "morgan";
import router from "./routes/index.js";


dotenv.config({ path: "../.env"});

const app = express();
const PORT = process.env.PORT ||8000;

// Database connection
dbConnection();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({extended:true}));

app.use(morgan("dev"))
app.use(router);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})
// show hello world
app.get("/", (req, res) => {
  res.send("Hello World");
});