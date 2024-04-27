import { Router } from "express";

const index = Router();

index.get("/", async (req, res) => {
  try {
    res.status(404).send("No method defined for this route.");
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(500).send({Error: error.message})
    else
      res.status(500).send({Error: "Unknown error"})
  }
});

export default index;
