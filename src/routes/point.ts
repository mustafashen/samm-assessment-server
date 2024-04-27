import { Router } from "express";
import { readPoints } from "../utils/read-points.js";

const point = Router();

point.post("/create", async (req, res) => {
  try {
    res.status(404).send("No method defined for this route.");
  } catch (error: unknown) {
    if (error instanceof Error) res.status(500).send({ Error: error.message });
    else res.status(500).send({ Error: "Unknown error" });
  }
});

point.get("/read", async (req, res) => {
  try {
    const pointsData = await readPoints();

    if (pointsData.error) {
      res.status(500).send({
        data: [],
        errors: [pointsData.error],
      });
    } else {
      res.status(200).send({
        data: pointsData.data,
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(500).send({
        data: [],
        errors: [
          {
            title: error.name,
            detail: error.message,
          },
        ],
      });
    else
      res.status(500).send({
        data: [],
        errors: [
          {
            title: "Internal server error",
            detail: "An error occurred while trying to read the points.",
          },
        ],
      });
  }
});

point.get("/delete", async (req, res) => {
  try {
    res.status(404).send("No method defined for this route.");
  } catch (error: unknown) {
    if (error instanceof Error) res.status(500).send({ Error: error.message });
    else res.status(500).send({ Error: "Unknown error" });
  }
});

export default point;
