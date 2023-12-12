import React from "react";
import prisma from "../../../../prisma/client";
import { notFound } from "next/navigation";
import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";
import EditDeleteBtn from "@/app/components/EditDeleteBtn";
import { BsPencil, BsTrash } from "react-icons/bs";
import { Issue } from "@prisma/client";
import { IssueStatusBadge } from "@/app/components";

const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <Card className="max-w-2xl p5">
        <Flex className=" justify-between relative ">
          <Heading>{issue.title}</Heading>
          <Flex gap={"2"}>
            <span>Status &gt;</span>
            <IssueStatusBadge status={issue.status} />
          </Flex>
        </Flex>
        <small>{issue.createdAt.toDateString()}</small>
        <div className=" space-x-2 ">
          <Text as="div" className="mb-7">
            {issue.description}
          </Text>
          <div className="absolute right-2 bottom-2">
            <Flex gap={"3"}>
              <EditDeleteBtn
                href={`/issues/${issue.id}/edit`}
                text="Edit"
                icon={<BsPencil />}
                size="1"
              />
              <EditDeleteBtn
                href={`/issues/${issue.id}/delete`}
                icon={<BsTrash />}
                text="Delete"
                color="red"
                size="1"
              />
            </Flex>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
