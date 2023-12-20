import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import LoadingFormSkeleton from "../../../_components/IssueFormSkel";
import prisma from "../../../../../../prisma/client";

interface Props {
  params: { id: string };
}

// lazy loader fn to load entire form dynamically
const IssueForm = dynamic(() => import("../../../_components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingFormSkeleton />,
});

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <>
      <IssueForm issue={issue} />;
    </>
  );
};

export default EditIssuePage;