"use client";

import React from "react";
import { add, format, differenceInCalendarDays } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import distanceToVolume from "./distanceToVolume";
import { WaterLevel } from "./water-level/WaterLevel";
import Card from "./stat-widget/Card";

const dateFormatter = (date: Date | number) => {
  return format(new Date(date), "dd/MMM");
};

/**
 * get the dates between `startDate` and `endSate` with equal granularity
 */
const getTicks = (startDate: Date, endDate: Date, num: number) => {
  const diffDays = differenceInCalendarDays(endDate, startDate);

  let current = startDate,
    velocity = Math.round(diffDays / (num - 1));

  const ticks = [startDate.getTime()];

  for (let i = 1; i < num - 1; i++) {
    ticks.push(add(current, { days: i * velocity }).getTime());
  }

  ticks.push(endDate.getTime());
  return ticks;
};

/**
 * Add data of the date in ticks,
 * if there is no data in that date in `data`.
 *
 * @param _ticks
 * @param {*} data
 */
const fillTicksData = (_ticks: number[], data: any) => {
  const ticks = [..._ticks];
  const filled = [];
  let currentTick = ticks.shift();
  let lastData = null;
  for (const it of data) {
    if (ticks.length && it.date > currentTick! && lastData) {
      filled.push({ ...lastData, ...{ date: currentTick } });
      currentTick = ticks.shift();
    } else if (ticks.length && it.date === currentTick) {
      currentTick = ticks.shift();
    }

    filled.push(it);
    lastData = it;
  }

  return filled;
};

const DateArea = ({ chartData }: { chartData: any }) => {
  const data = chartData.map((value: WaterLevel) => {
    return {
      id: value.id,
      date: new Date(value.timestamp),
      val: distanceToVolume(value.level),
    };
  });

  const startDate = new Date(2023, 0, 1);
  const endDate = new Date(Date.now());
  // const data = [
  //   { date: startDate.getTime(), val: 2000 },
  //   { date: new Date(2019, 4, 30).getTime(), val: 5000 },
  //   { date: new Date(2019, 5, 30).getTime(), val: 5000 },
  //   { date: new Date(2019, 6, 21).getTime(), val: 6000 },
  //   { date: new Date(2019, 6, 28).getTime(), val: 9000 },
  // ];

  const domain = [(dataMin: number) => dataMin, () => endDate.getTime()];
  const ticks = getTicks(startDate, endDate, 5);
  const filledData = fillTicksData(ticks, data);

  return (
    <Card className="w-full h-[400px] hidden lg:block mt-4">
      <AreaChart
        data={filledData}
        margin={{
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        }}
        width={900}
        height={400}
        onClick={async (value) => {
          await navigator.clipboard.writeText(
            value.activePayload?.at(0).payload.id
          );
        }}
      >
        <XAxis
          dataKey="date"
          scale="time"
          tickFormatter={dateFormatter}
          type="number"
          // @ts-ignore
          domain={domain}
          ticks={ticks}
          stroke="#FFF"
          interval={0}
        />
        {/*<YAxis tickCount={7} />*/}
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <Area
          type="basis"
          dataKey="val"
          stroke="none"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Tooltip
          labelFormatter={(value: number) => [new Date(value).toLocaleString()]}
          formatter={(value, name, props) => [value, "Litres"]}
        />
      </AreaChart>
    </Card>
  );
};

export default DateArea;
