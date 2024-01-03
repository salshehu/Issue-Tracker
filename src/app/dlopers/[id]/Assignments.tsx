"use client";
import {
  Flex,
  Text,
  TableBody,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
  TableCell,
} from "@radix-ui/themes";
import { Developers, Issue } from "@prisma/client";

import { useEffect, useState } from "react";
import { LinkComp } from "@/_components";

interface Props {
  dev: Developers;
}

// interface Data {
//   issues: { issues: Issue[] };
// }

export const Assignments = ({ dev }: Props) => {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const getDevlist = async () => {
      try {
        const res = await fetch(`/api/devs/assignments/${dev.Id}`);

        if (!res.ok) throw new Error();

        const backdata = await res.json();

        const resdata = backdata[0];
        // console.log("res", resdata);

        const arrData = Object.values(resdata);

        const finData = Object.values(arrData);
        // let result = finData.map((d) => console.log(d));

        // console.log("result", Array.isArray(Data));

        setAssignments(finData);
      } catch (error) {
        setErr("Error! Could not get list of assigned issues");
        console.error("Something went wrong", error);
      }
    };

    getDevlist();
  }, []);

  return (
    <Flex className="">
      {assignments.length > 0 ? (
        <TableRoot variant="surface">
          <TableHeader>
            <TableColumnHeaderCell>Issue Id</TableColumnHeaderCell>
            <TableColumnHeaderCell>Issue Title</TableColumnHeaderCell>
            <TableColumnHeaderCell>Status</TableColumnHeaderCell>
            <TableColumnHeaderCell>Description</TableColumnHeaderCell>
          </TableHeader>
          <TableBody>
            {assignments[0].map((data, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <LinkComp href={`/issues/${data.Id}`}>{data.Id}</LinkComp>
                </TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.status}</TableCell>
                <TableCell>{data.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      ) : (
        <Text> No issue assigned here yet</Text>
      )}
    </Flex>
  );
};
