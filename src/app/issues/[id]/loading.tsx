import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetailPage = () => {
  return (
    <div className="p-5  max-w-2xl space-y-1">
      <Card>
        <Flex gap={"4"} className="space-x-3 justify-between" my={"1"}>
          <Skeleton className=" w-9 " />
        </Flex>
        <small>
          <Skeleton className=" w-3" />
        </small>
        <Skeleton className=" w-9" />
      </Card>
    </div>
  );
};

export default LoadingIssueDetailPage;
