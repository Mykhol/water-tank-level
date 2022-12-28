import {DynamoService} from "../dynamo/DynamoService";
import {WaterLevel} from "./WaterLevel";
import {number} from "prop-types";

export class WaterLevelRepo {
  constructor(private service: DynamoService<WaterLevel>) {}

  async addWaterLevel(timestamp: number, level: number){
    return await this.service.addItem({timestamp: timestamp, level: level})
  }
}