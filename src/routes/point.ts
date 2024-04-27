import { Router } from "express";
import { readPoints } from "../utils/read-points.js";
import { generateErrorMessage } from "../utils/generate-message.js";
import { createPoint } from "../utils/create-point.js";
import { validatePointCreate } from "../validation/new-point.js";
import { Point } from "../types/points.js";
import { deletePoint } from "../utils/delete-point.js";

const point = Router();

point.post("/create", async (req, res) => {
  try {
    if (!validatePointCreate(req.body))
      throw new Error("Invalid input for point creation");

    const createResponse = await createPoint(req.body.data.attributes);

    if (createResponse.success) {
      res.status(201).send({
        data: {
          id: createResponse.data.id,
          type: "points",
          attributes: createResponse.data,
        },
      });
    } else if ("message" in createResponse) {
      res.status(500).send({
        errors: [
          {
            title: createResponse.name
              ? createResponse.name
              : "Point creation error",
            detail: createResponse.message,
          },
        ],
      });
    }
  } catch (error: unknown) {
    const message = generateErrorMessage(
      error,
      "An unknown error occurred while creating points."
    );
    res.status(500).send({
      errors: [
        {
          title: message.name ? message.name : "Point read error",
          detail: message.message,
        },
      ],
    });
  }
});

point.get("/read", async (req, res) => {
  try {
    const readResponse = await readPoints();

    if (readResponse.success) {
      res.status(200).send({
        data: readResponse.data.map((point: Point) => ({
          id: point.id,
          type: "points",
          attributes: point,
        })),
      });
    } else if ("message" in readResponse) {
      res.status(500).send({
        data: [],
        errors: [
          {
            title: readResponse.name ? readResponse.name : "Point read error",
            detail: readResponse.message,
          },
        ],
      });
    }
  } catch (error: unknown) {
    const message = generateErrorMessage(
      error,
      "An unknown error occurred while reading points."
    );
    res.status(500).send({
      data: [],
      errors: [
        {
          title: message.name ? message.name : "Point read error",
          detail: message,
        },
      ],
    });
  }
});

point.delete("/:pointId", async (req, res) => {
  try {
    const deleteResponse = await deletePoint(req.params.pointId);
    if (deleteResponse.success) {
      res.status(200).send({
        data: {
          id: deleteResponse.data.id,
          type: "points",
          attributes: deleteResponse.data,
        },
      });
    } else if ("message" in deleteResponse) {
      res.status(500).send({
        errors: [
          {
            title: deleteResponse.name
              ? deleteResponse.name
              : "Point deletion error",
            detail: deleteResponse.message,
          },
        ],
      });
    }
  } catch (error: unknown) {}
});

export default point;
