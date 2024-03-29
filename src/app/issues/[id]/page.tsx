import { IssueStatusBadge, LinkComp } from "@/_components";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound, redirect } from "next/navigation";
import prisma from "../../../../prisma/client";
import DeleteIssueBtn from "./DeleteIssueBtn";
import EditIssueBtn from "../_components/EditIssueBtn";
import ReactMarkdown from "react-markdown";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/authOptions";
import { cache } from "react";
import MarkComplete from "./MarkComplete";
import Link from "next/link";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  // validat session
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const issue = await getIssue(params);

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
            <ReactMarkdown className="mb-5 prose">
              {issue.description}
            </ReactMarkdown>

            {issue.dateCompleted && (
              <Text className="text-sm">
                Marked completed on {issue.dateCompleted.toDateString()}
              </Text>
            )}
          </div>
        </Card>
      </Box>
      <Box className="flex justify-between  md:flex-col md:justify-normal">
        <MarkComplete issue={issue} />
        <Flex
          gap={"3"}
          className="flex-row justify-end md:flex-col  mx-3 mt-3  "
        >
          <Link href={`/issues/new/${issue.Id}`}>
            <EditIssueBtn />
          </Link>

          <DeleteIssueBtn id={issue.Id} />
        </Flex>
      </Box>
    </Grid>
  );
};

const getIssue = cache(async ({ id }: { id: string }) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: { Id: parseInt(id) },
    });

    if (!issue) throw new Error();
    return issue;
  } catch (error) {
    console.log(error);
  }
});

export async function generateMetadata({ params }: Props) {
  const mdata = await getIssue(params);
  return {
    title: mdata?.title,
    description: mdata?.description,
  };
}

export default IssueDetailsPage;
