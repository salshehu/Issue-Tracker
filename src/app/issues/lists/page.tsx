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
  const issues = await prisma.issue.findMany();

  return (
    <div className="m-auto p-5 ">
      <IssuesTopBar />
      <div>
        <Table.Root variant="surface">
          <TableHeader>
            <TableRow>
              <TableColumnHeaderCell>Id</TableColumnHeaderCell>
              <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
              <TableColumnHeaderCell className="hidden md:table-cell">
                Status
              </TableColumnHeaderCell>
              <TableColumnHeaderCell className="hidden md:table-cell">
                Created
              </TableColumnHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>{issue.id}</TableCell>
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
                <TableCell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table.Root>
      </div>
    </div>
  );
};

export default Issues;
