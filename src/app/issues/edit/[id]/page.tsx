import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";
import LoadingFormSkeleton from "../../_components/IssueFormSkel";
import prisma from "../../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/authOptions";

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

  const issue = await prisma.issue.findUnique({
    where: { Id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <>
      <IssueForm issue={issue} />;
    </>
  );
};

export default EditIssuePage;
