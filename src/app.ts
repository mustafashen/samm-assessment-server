import express from "express";
import index from "./routes/index.js";
import points from "./routes/points.js";
import initializePointStore from "./utils/init-point-store.js";
import bodyParser from "body-parser";
import cors from "cors"

(async function main() {
  console.log(await initializePointStore());
  const app = express();
  app.use(cors())
  app.use(bodyParser.json());
  app.use(index);
  app.use("/points", points);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
})();
