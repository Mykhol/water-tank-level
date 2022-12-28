import {DynamoService} from "../dynamo/DynamoService";
import {WaterLevelRepo} from "../water-level/WaterLevelRepo";

const dynamoService = new DynamoService(process.env.AWS_REGION!,
  process.env.AWS_ACCESS_KEY_ID!,
  process.env.AWS_SECRET_ACCESS_KEY!,
  "water_tank_level");


export const waterLevelRepo = new WaterLevelRepo(dynamoService)