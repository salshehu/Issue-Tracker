import { authOptions } from "@/_lib/authOptions";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import prisma from "../../../../../prisma/client";
import LoadingFormSkeleton from "../../_components/IssueFormSkel";

interface Props {
  params: { id: string };
}

// lazy loader fn to load entire form dynamically
const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingFormSkeleton />,
});

const EditIssuePage = async ({ params }: Props) => {
  // Validate session
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const issue = await getIssue(params);

  if (!issue) notFound();

  return (
    <>
      <IssueForm issue={issue} />;
    </>
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

export default EditIssuePage;
