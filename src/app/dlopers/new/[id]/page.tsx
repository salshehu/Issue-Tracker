import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import prisma from "../../../../../prisma/client";

interface Props {
  params: { id: string };
}

// lazy loader fn to load entire form dynamically
const DevForm = dynamic(() => import("../../_components/DevForm"), {
  ssr: false,
  // loading: () => <LoadingFormSkeleton />,
});

const EditDevPage = async ({ params }: Props) => {
  console.log(params.id);

  const dev = await prisma.developers.findUnique({
    where: { Id: params.id },
  });

  if (!dev) notFound();

  return <DevForm dev={dev} />;
};

export default EditDevPage;

//
