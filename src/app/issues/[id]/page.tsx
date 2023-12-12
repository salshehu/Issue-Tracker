import React from "react";
import prisma from "../../../../prisma/client";
import { notFound } from "next/navigation";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { BsPencil, BsTrash } from "react-icons/bs";
import { LinkComp } from "@/app/components";
import EditDeleteBtn from "@/app/components/EditDeleteBtn";

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
        <div className="flex absolute right-1 bottom-1 gap-2">
          <EditDeleteBtn
            href={`/issues/${issue.id}/edit`}
            size="1"
            color="violet"
            icon={<BsPencil />}
            text="Edit"
          />
          <EditDeleteBtn
            href={`/issues/${issue.id}/delete`}
            size="1"
            color="green"
            icon={<BsTrash />}
            text="Delete"
          />
        </div>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
