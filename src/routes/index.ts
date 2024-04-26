import { Router } from "express";

const index = Router();

index.get("/", async (req, res) => {
  try {
    res.send('Hello world!');
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(500).send({Error: error.message})
    else
      res.status(500).send({Error: "Unknown error"})
  }
});

export default index;
