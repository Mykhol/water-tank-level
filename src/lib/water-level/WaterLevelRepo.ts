import { DynamoService } from "../dynamo/DynamoService";
import { WaterLevel } from "./WaterLevel";
import { number } from "prop-types";

export class WaterLevelRepo {
  constructor(private service: DynamoService<WaterLevel>) {}

  async addWaterLevel(id: string, timestamp: number, level: number) {
    return await this.service.addItem({
      id: id,
      timestamp: timestamp,
      level: level,
    });
  }
}
