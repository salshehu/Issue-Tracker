import React from "react";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "../../../prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import IssueStatusPie from "./IssueStatusPie";

const Dashboard = async () => {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid columns={{ initial: "1", md: "2" }} className=" content-center">
      <Flex direction={"column"} gap={"2"}>
        <Flex className=" block justify-center content-center md:flex">
          <IssueStatusPie />
          <IssueSummary closed={closed} inProgress={inProgress} open={closed} />
        </Flex>
        <IssueChart closed={closed} inProgress={inProgress} open={open} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export default Dashboard;
