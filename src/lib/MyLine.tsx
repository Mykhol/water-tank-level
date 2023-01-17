"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { WaterLevel } from "./water-level/WaterLevel";
import heightToVolume from "./heightToVolume";
import distanceToVolume from "./distanceToVolume";
import Card from "./stat-widget/Card";

const MyLine = ({ chartData }: { chartData: any }) => {
  const inLitres = chartData.map((value: WaterLevel) => {
    return {
      id: value.id,
      timestamp: new Date(value.timestamp),
      level: distanceToVolume(value.level),
    };
  });

  const numbers = inLitres.map((data: WaterLevel) => {
    return data.level;
  });

  const min = Math.min(...numbers);
  const max = Math.min(...numbers);

  let ticks = [];

  for (let i = 0; i < 10; i++) {
    const tickMin = Math.floor(min / 1000) * 1000;

    ticks.push(tickMin + 250 * (i + 1));
  }

  return (
    <Card>
      <AreaChart
        width={900}
        height={600}
        data={inLitres}
        onClick={async (value) => {
          await navigator.clipboard.writeText(
            value.activePayload?.at(0).payload.id
          );
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <Area
          type="basis"
          dataKey="level"
          stroke="none"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        {/*<CartesianGrid stroke="#FFF" strokeDasharray="4 1 2" />*/}
        <XAxis
          dataKey="timestamp"
          tickFormatter={(data) => new Date(data).toLocaleDateString()}
          domain={["auto", "auto"]}
          scale="time"
        />
        {/*<YAxis type="number" />*/}
        <YAxis type="number" domain={[13000, 14000]} hide={true} />
        <Tooltip
          labelFormatter={(value: number) => [new Date(value).toLocaleString()]}
          formatter={(value, name, props) => [value, "Litres"]}
        />
        {/*<ReferenceLine*/}
        {/*  y={heightToVolume(50)}*/}
        {/*  stroke="red"*/}
        {/*  label="Minimum Safe Water Level"*/}
        {/*  strokeDasharray="5 5"*/}
        {/*  strokeWidth="2"*/}
        {/*/>*/}
      </AreaChart>
    </Card>
  );
};

export default MyLine;
