import { DynamoService } from "../dynamo/DynamoService";
import { WaterLevelRepo } from "../water-level/WaterLevelRepo";
import { WaterLevel } from "../water-level/WaterLevel";

const dynamoService = new DynamoService<WaterLevel>(
  process.env.AWS_REGION!,
  process.env.AWS_ACCESS_KEY_ID!,
  process.env.AWS_SECRET_ACCESS_KEY!,
  "water_tank_level"
);

export const waterLevelRepo = new WaterLevelRepo(dynamoService);
