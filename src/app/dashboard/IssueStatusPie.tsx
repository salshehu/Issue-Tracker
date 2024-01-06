"use client";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class IssueStatusPie extends PureComponent<Props> {
  state = {
    data: [
      { name: "Open", value: this.props.open },
      { name: "In Progress", value: this.props.inProgress },
      { name: "Closed", value: this.props.closed },
    ],
  };

  render() {
    console.log(this.props);
    // console.log(this.state);

    return (
      <div className=" items-center justify-center w-56 h-56 border m-2 self-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={this.state.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
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
      </div>
    );
  }
}

//const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
// const IssueStatusPie = ({ open, inProgress, closed }: Props) => {
//   const data01 = [
//     { name: "Open", value: open },
//     { name: "In Progress", value: inProgress },
//     { name: "Closed", value: closed },
//   ];

//   return (
//     <div className=" items-center justify-center w-56 h-56 border m-2 self-auto">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart width={300} height={300}>
//           <Pie
//             dataKey="value"
//             isAnimationActive={true}
//             data={data01}
//             cx="50%"
//             cy="50%"
//             outerRadius={80}
//             fill="#8884d8"
//             label
//           />
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default IssueStatusPie:
