"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const statusList: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFIlter = () => {
  const router = useRouter();
  const params = new URLSearchParams();
  const searchParams = useSearchParams();

  // const [qry, setQry] = useState('')

  // const qryStr =(e)=>{

  //   const query = status ? `?status=${status}` : "";
  //   router.push("/issues/lists" + query);
  // }

  return (
    <div className="mx-1 inline-block">
      <Select.Root
        onValueChange={(status) => {
          if (status) params.append("status", status);
          if (searchParams.get("orderBy"))
            params.append("orderBy", searchParams.get("orderBy")!);
          if (searchParams.get("q")) params.append("q", searchParams.get("q")!);
          const query = params.size ? "?" + params.toString() : "";
          router.push("/issues" + query);
        }}
        defaultValue={searchParams.get("status") || ""}
        size="1"
      >
        <Select.Trigger />
        <Select.Content>
          {statusList.map((status) => (
            <Select.Item key={status.value} value={status?.value || "Status"}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>

    // <select
    //   onChange={(e)=>qryStr(e.target.value)}
    // >
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
