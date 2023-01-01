import React from "react";
import { WaterLevel } from "../lib/water-level/WaterLevel";
import { waterLevelRepo } from "../lib/di/DI";
import dynamic from "next/dynamic";
import distanceToVolume from "../lib/distanceToVolume";
import heightToVolume from "../lib/heightToVolume";

const MyLine = dynamic(import("../lib/MyLine"), { ssr: false });

const getWaterLevelData = async () => {
  return await waterLevelRepo.getWaterLevels();
};

export default async function Home() {
  const data = (await getWaterLevelData()) as WaterLevel[];

  const sortedDesc = data?.sort(
    (objA, objB) => objB.timestamp - objA.timestamp
  ) as WaterLevel[];

  const sortedAsc = data?.sort(
    (objA, objB) => objA.timestamp - objB.timestamp
  ) as WaterLevel[];

  console.log(data[data.length - 1]);

  const usageToday = sortedDesc.filter((value) => {
    return (
      value.timestamp >
      new Date(new Date().getTime() - 24 * 60 * 60 * 1000).valueOf()
    );
  });

  const usageInLitres = heightToVolume(
    usageToday[0].level - usageToday[usageToday.length - 1].level
  );

  const daysRemainingOnUsage = Math.abs(
    Math.floor(distanceToVolume(data[data.length - 1].level) / usageInLitres)
  );

  console.log(sortedAsc[0]);
  console.log(sortedDesc[0]);

  return (
    <div>
      <h2>{distanceToVolume(data[data.length - 1].level)}</h2>
      <p>Usage today: {usageInLitres} L</p>
      <p>Days remaining on current usage: {daysRemainingOnUsage}</p>
      <MyLine chartData={sortedAsc} />
    </div>
  );
}
