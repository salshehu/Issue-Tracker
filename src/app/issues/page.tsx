import {
  Heading,
  Table,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRow,
} from "@radix-ui/themes";
import prisma from "../../../prisma/client";
import { LinkComp } from "@/_components";
import IssueStatusBadge from "@/_components/IssueStatusBadge";
import IssuesTopBar from "./_components/IssuesTopBar";
import DeleteIssueBtn from "./[id]/DeleteIssueBtn";
import EditIssueBtn from "./_components/EditIssueBtn";
import Link from "next/link";
import IssueStatusFIlter from "./_components/IssueStatusFIlter";
import { Issue, Status } from "@prisma/client";
import { BsChevronUp } from "react-icons/bs";
import Pagination from "@/_components/Pagination";
import { equal } from "assert";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Entries;
    page: string;
    q: string;
  };
}

interface Entries {
  title: string;
  status: string;
  Id: string;
  createdAt: Date;
  dateCompleted: Date;
  userName: string;
}

// extraction of table column headers
const columnsHeaders: {
  label: string;
  value: keyof Entries;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Assigned to:", value: "userName" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  {
    label: "Completed",
    value: "dateCompleted",
    className: "hidden md:table-cell gap-1",
  },
];

const Issues = async ({ searchParams }: Props) => {
  //********************** */
  // validate query paramater received before passing to prisma
  const statusCheck = Object.values(Status);
  const status = statusCheck.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnsHeaders
    .map((col) => col.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  console.log(searchParams.q);

  // set-up pagination
  const page = +searchParams.page || 1;
  const pageSize: number = 7;

  //call to prisma to fetch data
  // const entries = await prisma.developers.findMany({
  //   select: {
  //     userName: true,
  //     issues: {
  //       select: {
  //         Id: true,
  //         title: true,
  //         description: true,
  //         status: true,
  //         createdAt: true,
  //         dateCompleted: true,
  //         devId: undefined,
  //       },
  //       where: {
  //         status,
  //       },
  //       orderBy,
  //     },
  //   },
  //   skip: (page - 1) * pageSize,
  //   take: pageSize,
  // });

  const entries = await prisma.issueView.findMany({
    where: {
      status,
      AND: [
        {
          title: {
            search: searchParams.q,
          },
        },
      ],
    },

    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: {
      status,
      AND: [
        {
          title: {
            search: searchParams.q,
          },
        },
      ],
    },
  });

  return (
    <div className="m-auto p-5 ">
      <Heading as="h3">Issue List</Heading>
      <IssuesTopBar />
      {entries.length > 0 ? (
        <div className="my-3">
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
              {entries.map((issue) => (
                <TableRow key={issue.Id}>
                  <TableCell>
                    <LinkComp href={`/issues/${issue.Id}`}>
                      {issue.title}{" "}
                      <div className="block md:hidden">
                        <IssueStatusBadge status={issue.status} />
                      </div>
                    </LinkComp>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <IssueStatusBadge status={issue.status} />
                  </TableCell>
                  <TableCell>{issue?.userName || "unassigned"}</TableCell>
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
                    <Link href={`/issues/edit/${issue.Id}`}>
                      <EditIssueBtn />
                    </Link>
                    <DeleteIssueBtn id={issue.Id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table.Root>
          <Pagination
            currentPage={page}
            itemsCount={issueCount}
            pageSize={pageSize}
          />
        </div>
      ) : (
        <Heading as="h5">No Such Records of this Search was Found</Heading>
      )}
    </div>
  );
};

export default Issues;
