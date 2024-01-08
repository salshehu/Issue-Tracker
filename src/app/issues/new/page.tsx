import React from "react";
import dynamic from "next/dynamic";
import LoadingFormSkeleton from "./loading";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/authOptions";
import { redirect } from "next/navigation";
import { Metadata } from "next";

// lazy loader fn to load entire form dynamically
const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingFormSkeleton />,
});

const NewIssuePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return <IssueForm />;
};

export const metadata: Metadata = {
  title: "New Issue ",
  description: "Enter details of new bug issue discovered",
};

export default NewIssuePage;
