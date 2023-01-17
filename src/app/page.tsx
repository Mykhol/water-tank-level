import React from "react";
import { WaterLevel } from "../lib/water-level/WaterLevel";
import { waterLevelRepo } from "../lib/di/DI";
import dyn from "next/dynamic";
import distanceToVolume from "../lib/distanceToVolume";
import heightToVolume from "../lib/heightToVolume";
import UsageTodayWidget from "../lib/stat-widget/UsageTodayWidget";
import CurrentLevel from "../lib/stat-widget/CurrentLevel";
import Forecast from "../lib/stat-widget/Forecast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MyLine = dyn(import("../lib/MyLine"), { ssr: false });
const DateArea = dyn(import("../lib/DateArea"), { ssr: false });

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

  const currentVolume = distanceToVolume(data[data.length - 1].level);

  return (
    <div>
      <h2 className="text-3xl font-extrabold mb-1">Water Tank Level Monitor</h2>
      <p className="mb-8">
        Made by{" "}
        <Link
          className="underline text-blue-400 cursor-pointer"
          href="https://github.com/Mykhol"
        >
          Michael Howell
        </Link>
        .
      </p>
      <div className="flex flex-row space-x-4 mb-6">
        <CurrentLevel litres={currentVolume} />
        <CurrentLevel litres={currentVolume} percent={true} />
        <UsageTodayWidget litres={usageInLitres} />
        <Forecast days={daysRemainingOnUsage} />
      </div>
      <DateArea chartData={sortedAsc} />
    </div>
  );
}
