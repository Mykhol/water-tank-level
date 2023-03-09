"use client";

import { Icon } from "@iconify/react";
import Card from "./Card";

const Forecast = ({ days }: { days: number | null }) => {
  return days ? (
    <Card>
      <Icon
        icon="material-symbols:water-damage-outline"
        className="text-5xl text-white"
      />
      <div className="text-white ml-4">
        <h2 className="text-2xl font-extrabold">{days}</h2>
        <p className="">Days Remaining</p>
      </div>
    </Card>
  ) : null;
};

export default Forecast;
