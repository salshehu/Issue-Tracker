"use client";
import React, { PureComponent } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

export default class IssueStatusPie extends PureComponent<Props> {
  state = {
    data01: [
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
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={this.state.data01}
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
