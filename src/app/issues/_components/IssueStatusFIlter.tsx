"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { stat } from "fs";
import React from "react";

const statusList: { label: string; value?: Status }[] = [
  { label: "All Status" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFIlter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter status..." />
      <Select.Content>
        {statusList.map((status) => (
          <Select.Item key={status.value} value={status?.value || "All"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>

    // <select>
    //   <label>Status</label>
    //   {statusList.map((status) => (
    //     <option key={status.value} value={status.value}>
    //       {status.label}
    //     </option>
    //   ))}
    // </select>
  );
};

export default IssueStatusFIlter;
