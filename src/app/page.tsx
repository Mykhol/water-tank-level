import React from "react";
import { WaterLevel } from "../lib/water-level/WaterLevel";
import { waterLevelRepo } from "../lib/di/DI";
import dyn from "next/dynamic";
import distanceToVolume from "../lib/distanceToVolume";
import heightToVolume from "../lib/heightToVolume";

const MyLine = dyn(import("../lib/MyLine"), { ssr: false });

export const dynamic = "force-dynamic";

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

  return (
    <div>
      <h2>{distanceToVolume(data[data.length - 1].level)}</h2>
      <p>Usage today: {usageInLitres} L</p>
      <p>Days remaining on current usage: {daysRemainingOnUsage}</p>
      <MyLine chartData={sortedAsc} />
    </div>
  );
}
