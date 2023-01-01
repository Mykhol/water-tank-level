"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { WaterLevel } from "./water-level/WaterLevel";
import heightToVolume from "./heightToVolume";

const MyLine = ({ chartData }: { chartData: any }) => {
  const inLitres = chartData.map((value: WaterLevel) => {
    return {
      id: value.id,
      timestamp: new Date(value.timestamp),
      level:
        Math.round(
          ((2.6 - value.level / 100) * Math.PI * (1.625 * 1.625) * 1000) / 50
        ) * 50,
    };
  });

  return (
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
          <stop offset="5%" stopColor="#8BC6FC" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area
        type="basis"
        dataKey="level"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis
        dataKey="timestamp"
        tickFormatter={(data) => new Date(data).toDateString()}
      />
      <YAxis />
      <Tooltip
        labelFormatter={(value: number) => [new Date(value).toLocaleString()]}
        formatter={(value, name, props) => [value, "Litres"]}
      />
      <ReferenceLine
        y={heightToVolume(50)}
        stroke="red"
        label="Minimum Safe Water Level"
        strokeDasharray="3 3"
      />
    </AreaChart>
  );
};

export default MyLine;
