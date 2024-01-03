import {
  Heading,
  Table,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRow,
} from "@radix-ui/themes";
import React from "react";
import prisma from "../../../prisma/client";
import { LinkComp } from "@/_components";
import Pagination from "@/_components/Pagination";
import { Contract } from "@prisma/client";
import Link from "next/link";
import { BsArrowUp } from "react-icons/bs";

interface Props {
  searchParams: {
    page: string;
    orderBy: keyof Devlist;
  };
}

interface Devlist {
  userName: string;
  lastName: string;
  firstName: string;
  email: string;
  contract: Contract;
}

const listHeaders: {
  label: string;
  value: keyof Devlist;
  className?: string;
}[] = [
  { label: "User Name", value: "userName" },
  { label: "Last Name", value: "lastName" },
  { label: "First Name", value: "firstName" },
  { label: "Email Address", value: "email", className: "hidden md:table-cell" },
  { label: "Contract", value: "contract", className: "hidden md:table-cell" },
];

const page = async ({ searchParams }: Props) => {
  const page = +searchParams.page || 1;
  const pageSize: number = 10;

  const orderBy = listHeaders
    .map((col) => col.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const devs = await prisma.developers.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy,
  });
  const devCount = await prisma.developers.count();

  return (
    <div className="p-2">
      <Heading className="my-12">List of Available Developers</Heading>
      <Table.Root>
        <TableHeader>
          {listHeaders.map((colhead) => (
            <TableColumnHeaderCell
              key={colhead.value}
              className={colhead.className}
            >
              <div className="flex gap-1 items-center">
                {colhead.value === searchParams.orderBy && (
                  <BsArrowUp className="inline ml-1" />
                )}
                <Link
                  href={{ query: { ...searchParams, orderBy: colhead.value } }}
                >
                  {colhead.label}
                </Link>
              </div>
            </TableColumnHeaderCell>
          ))}
        </TableHeader>
        <TableBody>
          {devs.map((dev) => (
            <TableRow key={dev.Id}>
              <LinkComp href={`/dlopers/${dev.Id}`}>
                <TableCell>{dev.userName}</TableCell>
              </LinkComp>
              <TableCell>{dev.lastName}</TableCell>
              <TableCell>{dev.firstName}</TableCell>
              <TableCell className="hidden md:table-cell">
                {dev.email}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {dev.contract}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table.Root>
      <Pagination
        currentPage={page}
        itemsCount={devCount}
        pageSize={pageSize}
      />
    </div>
  );
};

export default page;
