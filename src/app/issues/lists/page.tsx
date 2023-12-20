import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRow,
} from "@radix-ui/themes";
import prisma from "../../../../prisma/client";
import { LinkComp } from "../../../_components";
import IssueStatusBadge from "../../../_components/IssueStatusBadge";
import IssuesTopBar from "../_components/IssuesTopBar";

const Issues = async () => {
  const entries = await prisma.devs.findMany({
    select: {
      userName: true,
      issues: {
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          createdAt: true,
          dateCompleted: true,
        },
      },
    },
  });

  return (
    <div className="m-auto p-5 ">
      <IssuesTopBar />
      <div>
        <Table.Root variant="surface">
          <TableHeader>
            <TableRow>
              <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
              <TableColumnHeaderCell className="hidden md:table-cell">
                Status
              </TableColumnHeaderCell>
              <TableColumnHeaderCell>Assigned to:</TableColumnHeaderCell>
              <TableColumnHeaderCell className="hidden md:table-cell">
                Created
              </TableColumnHeaderCell>
              <TableColumnHeaderCell className="hidden md:table-cell">
                Completed
              </TableColumnHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((dev) =>
              dev.issues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>
                    <LinkComp href={`/issues/lists/${issue.id}`}>
                      {issue.title}{" "}
                      <div className="block md:hidden">
                        <IssueStatusBadge status={issue.status} />
                      </div>
                    </LinkComp>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <IssueStatusBadge status={issue.status} />
                  </TableCell>
                  <TableCell>{dev.userName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {issue.createdAt.toDateString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {issue.dateCompleted ? (
                      issue.dateCompleted.toDateString()
                    ) : (
                      <span>Pending</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table.Root>
      </div>
    </div>
  );
};

export default Issues;
