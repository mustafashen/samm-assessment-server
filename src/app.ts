import express from "express";
import index from "./routes/index.js";
import point from "./routes/point.js";
import initializePointStore from "./utils/init-point-store.js";
import bodyParser from "body-parser";

(async function main() {
  console.log(await initializePointStore());
  const app = express();
  app.use(bodyParser.json());
  app.use(index);
  app.use("/points", point);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
})();
