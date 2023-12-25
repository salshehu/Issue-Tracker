import React from "react";
import prisma from "../../../prisma/client";
import {
  Card,
  Flex,
  Heading,
  TableBody,
  TableCell,
  TableRoot,
  TableRow,
} from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge, LinkComp } from "@/_components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <Card>
      <Heading size={"5"} mb={"-2"}>
        Latest Issues
      </Heading>
      <TableRoot>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <Flex direction={"column"} align={"start"} gap={"1"}>
                  <LinkComp href={`/issues/${issue.id}`}>
                    {issue.title}
                  </LinkComp>
                  <IssueStatusBadge status={issue.status} />
                </Flex>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Card>
  );
};

export default LatestIssues;
