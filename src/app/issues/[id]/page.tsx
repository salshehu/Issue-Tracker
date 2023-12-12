import React from "react";
import prisma from "../../../../prisma/client";
import { notFound } from "next/navigation";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { BsPencil } from "react-icons/bs";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div className="p-5  max-w-2xl space-y-1">
      <Card className="relative">
        <Flex gap={"4"} className="space-x-3 justify-between" my={"1"}>
          <Heading>{issue?.title}</Heading>

          <Flex className=" items-center ">
            <small className="pr-2">Status &gt;</small>
            <IssueStatusBadge status={issue.status} />
          </Flex>
        </Flex>
        <small>{issue.createdAt.toDateString()}</small>
        <Text as="div">{issue?.description}</Text>
        <Button size={"1"} className="absolute right-1 bottom-1">
          <BsPencil />
          Edit
        </Button>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
