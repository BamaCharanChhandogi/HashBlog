import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})