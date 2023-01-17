"use client";

import { Icon } from "@iconify/react";
import Card from "./Card";

const UsageTodayWidget = ({ litres }: { litres: number }) => {
  return (
    <Card>
      <Icon icon="material-symbols:history" className="text-5xl text-white" />
      <div className="text-white ml-4">
        <h2 className="text-2xl font-extrabold">{litres} L</h2>
        <p className="">Last 24h</p>
      </div>
    </Card>
  );
};

export default UsageTodayWidget;
