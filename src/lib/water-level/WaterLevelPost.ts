import { WaterLevel } from "./WaterLevel";
import { waterLevelRepo } from "../di/DI";
import { NextApiRequest, NextApiResponse } from "next";

export const WaterLevelPost = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const waterLevel = req.body;
  const currTime = Date.now();

  const waterLevelObject: WaterLevel = {
    id: currTime.toString(),
    timestamp: currTime,
    level: waterLevel,
  };

  const result = await waterLevelRepo.addWaterLevel(waterLevelObject);

  return res.json({ message: result });
};
