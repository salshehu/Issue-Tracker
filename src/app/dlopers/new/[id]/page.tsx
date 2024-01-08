import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";
import prisma from "../../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/authOptions";
import { cache } from "react";

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

  // const dev = await prisma.developers.findUnique({
  //   where: { Id: params.id },
  // });

  const dev = await getDev(params.id);

  if (!dev) notFound();

  return <DevForm dev={dev} />;
};

export async function generateMetadata({ params }: Props) {
  const data = await getDev(params.id);
  return {
    title: `Edit ${data?.userName}`,
    description: `${data?.firstName} Profile Edit`,
  };
}

const getDev = cache((id: string) =>
  prisma.developers.findUnique({ where: { Id: id } })
);

export default EditDevPage;

//
