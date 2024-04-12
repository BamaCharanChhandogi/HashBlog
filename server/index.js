import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { dbConnection } from "./dbConfig/index.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT ||8000;

// Database connection
dbConnection();

app.use(cors());
app.use(bodyParser.json());


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})