// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { waterLevelRepo } from "../../../lib/di/DI";
import { WaterLevel } from "../../../lib/water-level/WaterLevel";
import { WaterLevelPost } from "../../../lib/water-level/WaterLevelPost";
import { WaterLevelGet } from "../../../lib/water-level/WaterLevelGet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Add water level to database
  if (req.method === "POST") {
    return await WaterLevelPost(req, res);
  }

  // Retrieve water level from database
  if (req.method === "GET") {
    return await WaterLevelGet(req, res);
  }

  return res.status(400).send("An error has occured here.");
}
