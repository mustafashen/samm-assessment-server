import express from "express";
import index from "./routes/index.js";

const app = express();
app.use(index)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`)
})