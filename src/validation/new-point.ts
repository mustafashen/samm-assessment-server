import Ajv from "ajv";
import addFormats from "ajv-formats";
import { NewPoint } from "../types/points";
const ajv = new Ajv();
addFormats(ajv);
const schema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        type: {
          type: "string",
          const: "points",
        },
        attributes: {
          type: "object",
          properties: {
            lat: {
              type: "number",
            },
            lng: {
              type: "number",
            },
            datetime: {
              type: "string",
              format: "date-time",
            },
          },
          required: ["lat", "lng", "datetime"],
        },
      },
      required: ["type", "attributes"],
    },
  },
  required: ["data"],
};

export function validatePointCreate(body: {
  data: { type: string; attributes: NewPoint };
}) {
  return ajv.validate(schema, body);
}
