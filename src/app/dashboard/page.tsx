import React from "react";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "../../../prisma/client";
import IssueChart from "./IssueChart";

const Dashboard = async () => {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <div className="">
      <IssueSummary closed={closed} inProgress={inProgress} open={closed} />
      <IssueChart closed={closed} inProgress={inProgress} open={open} />
      <LatestIssues />{" "}
    </div>
  );
};

export default Dashboard;
