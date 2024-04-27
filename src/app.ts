import express from "express";
import index from "./routes/index.js";
import point from "./routes/point.js";
import initializePointStore from "./utils/init-point-store.js";

(async function main() {
  console.log(await initializePointStore());
  const app = express();
  app.use(index);
  app.use("/point", point);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
})();
