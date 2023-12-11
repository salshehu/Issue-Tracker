import React from "react";
import prisma from "../../../../prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

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
      <Card>
        <Flex gap={"4"} className="space-x-3 justify-between" my={"1"}>
          <Heading>{issue?.title}</Heading>
          <IssueStatusBadge status={issue.status} />
        </Flex>
        <small>{issue.createdAt.toDateString()}</small>
        <Text as="div">{issue?.description}</Text>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
