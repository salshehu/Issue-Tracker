import React from "react";
import prisma from "../../../prisma/client";
import { TableBody, TableCell, TableRoot, TableRow } from "@radix-ui/themes";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <TableRoot>
      <TableBody>
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell>{issue.title}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableRoot>
  );
};

export default LatestIssues;
