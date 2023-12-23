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
import { Issue, Status } from "@prisma/client";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { BsChevronUp } from "react-icons/bs";

interface Props {
  searchParams: { status: Status; orderBy: keyof Entries };
}

interface Entries {
  title: string;
  status: string;
  assignedto: string;
  createdAt: Date;
  dateCompleted: Date;
}

const Issues = async ({ searchParams }: Props) => {
  // validate query paramater received before passing to prisma
  const statusCheck = Object.values(Status);
  const status = statusCheck.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  //call to prisma to fetch data
  const entries = await prisma.devs.findMany({
    select: {
      userName: true,

      issues: {
        where: {
          status,
        },
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

  const columnsHeaders: {
    label: string;
    value: keyof Entries;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Assigned to:", value: "assignedto" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
    {
      label: "Completed",
      value: "dateCompleted",
      className: "hidden md:table-cell gap-1",
    },
  ];

  return (
    <div className="m-auto p-5 ">
      <IssuesTopBar />
      <div>
        <Table.Root variant="surface">
          <TableHeader>
            <TableRow>
              {columnsHeaders.map((h) => (
                <TableColumnHeaderCell key={h.value} className={h.className}>
                  <div className="flex gap-1 items-center">
                    {h.value === searchParams.orderBy && (
                      <BsChevronUp className="inline ml-1" />
                    )}
                    <Link
                      href={{ query: { ...searchParams, orderBy: h.value } }}
                    >
                      {h.label !== "Status" && h.label}
                      {h.label === "Status" && h.label}
                      {h.label === "Status" && <IssueStatusFIlter />}
                    </Link>
                  </div>
                </TableColumnHeaderCell>
              ))}
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
