import { WaterLevel } from "./WaterLevel";
import { waterLevelRepo } from "../di/DI";
import { NextApiRequest, NextApiResponse } from "next";

export const WaterLevelGet = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const data = await waterLevelRepo.getWaterLevels();

  if (data) {
    return res.status(200).json({ data: data });
  }

  return res.status(500).json({ message: "Something went wrong." });
};
