// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { waterLevelRepo } from "../../../lib/di/DI";
import { WaterLevel } from "../../../lib/water-level/WaterLevel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Add water level to database
  if (req.method === "POST") {
    const waterLevel = req.body as WaterLevel;
    const result = await waterLevelRepo.addWaterLevel(
      waterLevel.timestamp,
      waterLevel.timestamp
    );

    return res.status(200);
  }

  // Retrieve water level from database
  if (req.method === "GET") {
    console.log("Testing Get");
    return res.status(500).send("This method has not yet been implemented.");
  }

  // Update water level in database
  if (req.method === "UPDATE") {
    return res.status(500).send("This method has not yet been implemented.");
  }

  return res.status(400).send("An error has occured here.");
}
