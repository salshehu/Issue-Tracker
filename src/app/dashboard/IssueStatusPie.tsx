"use client";
import React, { PureComponent } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const data01 = [
  { name: "Open", value: 45 },
  { name: "In Progress", value: 32 },
  { name: "Closed", value: 28 },
];

export default class IssueStatusPie extends PureComponent {
  render() {
    return (
      <div className=" items-center justify-center w-56 h-56 border m-2 self-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={data01}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
