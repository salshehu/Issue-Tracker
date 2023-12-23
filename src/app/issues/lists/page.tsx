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
import EditDeleteBtn from "@/_components/EditDeleteBtn";
import DeleteIssueBtn from "./[id]/DeleteIssueBtn";
import EditIssueBtn from "../_components/EditIssueBtn";
import Link from "next/link";
import IssueStatusFIlter from "../_components/IssueStatusFIlter";

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
          devId: undefined,
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
                <IssueStatusFIlter />
              </TableColumnHeaderCell>
              <TableColumnHeaderCell>Assigned to:</TableColumnHeaderCell>
              <TableColumnHeaderCell className="hidden md:table-cell">
                Created
              </TableColumnHeaderCell>
              <TableColumnHeaderCell className="hidden md:table-cell">
                Completed
              </TableColumnHeaderCell>
              <TableColumnHeaderCell></TableColumnHeaderCell>
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
                  <TableCell>{dev ? dev.userName : "unassigned"}</TableCell>
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
                  <TableCell className="flex gap-2 h-4 items-center">
                    <Link href={`/issues/lists/${issue.id}/edit`}>
                      <EditIssueBtn />
                    </Link>
                    <DeleteIssueBtn id={issue.id} />
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
