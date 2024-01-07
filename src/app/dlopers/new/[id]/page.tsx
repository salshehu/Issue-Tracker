import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";
import prisma from "../../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/authOptions";

interface Props {
  params: { id: string };
}

// lazy loader fn to load entire form dynamically
const DevForm = dynamic(() => import("../../_components/DevForm"), {
  ssr: false,
  // loading: () => <LoadingFormSkeleton />,
});

const EditDevPage = async ({ params }: Props) => {
  //validate seesion
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const dev = await prisma.developers.findUnique({
    where: { Id: params.id },
  });

  if (!dev) notFound();

  return <DevForm dev={dev} />;
};

export default EditDevPage;

//
