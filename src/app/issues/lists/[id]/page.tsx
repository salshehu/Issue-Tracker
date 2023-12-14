import { IssueStatusBadge, LinkComp } from "@/_components";
import EditDeleteBtn from "@/_components/EditDeleteBtn";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { BsPencil } from "react-icons/bs";
import prisma from "../../../../../prisma/client";
import DeleteIssueBtn from "./DeleteIssueBtn";

const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "3", md: "5" }}>
      <Box className="sm:col-span-2 lg:col-span-4">
        <Card>
          <Flex className=" justify-between items-center ">
            <Heading>{issue.title}</Heading>
            <Flex gap={"2"} className="my-2">
              <span>Status &gt;</span>
              <IssueStatusBadge status={issue.status} />
            </Flex>
          </Flex>

          <small>{issue.createdAt.toDateString()}</small>
          <div className=" space-x-2 my-3">
            <Text as="div" className="mb-7">
              {issue.description}
            </Text>
          </div>
        </Card>
      </Box>
      <Box>
        <Flex
          gap={"3"}
          className="flex-row justify-end md:flex-col  mx-3 mt-3 "
        >
          <LinkComp href={`/issues/lists/${issue.id}/edit`}>
            <EditDeleteBtn text="Edit Issue" icon={<BsPencil />} />
          </LinkComp>

          <DeleteIssueBtn id={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
