import React from "react";
import dynamic from "next/dynamic";
import LoadingFormSkeleton from "./loading";

// lazy loader fn to load entire form dynamically
const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
