"use client";
import { Card } from "@radix-ui/themes";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default class Example extends PureComponent<Props> {
  state = {
    data: [
      { name: "Open", value: this.props.open },
      { name: "In Progress", value: this.props.inProgress },
      { name: "Closed", value: this.props.closed },
    ],
  };

  render() {
    return (
      <Card className="h-[17rem] content-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={300} height={300}>
            <Pie
              data={this.state.data}
              cx={200}
              cy={200}
              startAngle={180}
              endAngle={0}
              innerRadius={100}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {this.state.data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Card>
    );
  }
}

// onMouseEnter={this.onPieEnter}

//  <ResponsiveContainer width="100%" height="99%" className="  self-auto"></ResponsiveContainer>
