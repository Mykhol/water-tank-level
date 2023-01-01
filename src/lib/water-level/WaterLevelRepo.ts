import { DynamoService } from "../dynamo/DynamoService";
import { WaterLevel } from "./WaterLevel";

export class WaterLevelRepo {
  constructor(private service: DynamoService<WaterLevel>) {}

  async addWaterLevel(waterLevel: WaterLevel) {
    return await this.service.addItem(waterLevel);
  }

  async getWaterLevels() {
    return await this.service.getItems();
  }
}
