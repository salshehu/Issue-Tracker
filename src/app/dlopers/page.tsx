import {
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

const page = async () => {
  const devs = await prisma.developers.findMany();

  return (
    <div>
      <Table.Root>
        <TableHeader>
          <TableColumnHeaderCell>User Name</TableColumnHeaderCell>
          <TableColumnHeaderCell>Last Name</TableColumnHeaderCell>
          <TableColumnHeaderCell>First Name</TableColumnHeaderCell>
          <TableColumnHeaderCell>Contact Email</TableColumnHeaderCell>
          <TableColumnHeaderCell>Work Contract</TableColumnHeaderCell>
          <TableColumnHeaderCell>Contact Address</TableColumnHeaderCell>
        </TableHeader>
        <TableBody>
          {devs.map((dev) => (
            <TableRow key={dev.Id}>
              <LinkComp href={`/dlopers/${dev.Id}`}>
                <TableCell>{dev.userName}</TableCell>
              </LinkComp>
              <TableCell>{dev.lastName}</TableCell>
              <TableCell>{dev.firstName}</TableCell>
              <TableCell>{dev.email}</TableCell>
              <TableCell>{dev.contract}</TableCell>
              <TableCell>{dev.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table.Root>
    </div>
  );
};

export default page;
