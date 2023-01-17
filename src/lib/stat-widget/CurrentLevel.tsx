"use client";

import { Icon } from "@iconify/react";
import Card from "./Card";

const CurrentLevel = ({
  litres,
  percent = false,
}: {
  litres: number;
  percent?: boolean;
}) => {
  return (
    <Card>
      <Icon
        icon="material-symbols:water-drop"
        className="text-5xl text-white"
      />
      <div className="text-white ml-4">
        <h2 className="text-2xl font-extrabold">
          {percent ? `${Math.round((litres / 22500) * 100)}%` : `${litres} L`}
        </h2>
        <p className="">Current Level</p>
      </div>
    </Card>
  );
};

export default CurrentLevel;
