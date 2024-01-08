import React from "react";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "../../../prisma/client";
import IssueChart from "./IssueChart";
import { Button, Flex, Grid } from "@radix-ui/themes";
import IssueStatusPie from "./IssueStatusPie";
import { Spinner } from "@/_components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/authOptions";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View bug issues at a glance",
};

const Dashboard = async () => {
  // validate session
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid columns={{ initial: "1", md: "2" }} className=" content-center">
      <Flex direction={"column"} gap={"2"}>
        <Flex className=" block justify-center content-center md:flex">
          <IssueStatusPie closed={closed} inProgress={inProgress} open={open} />
          <IssueSummary closed={closed} inProgress={inProgress} open={open} />
        </Flex>
        <IssueChart closed={closed} inProgress={inProgress} open={open} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export default Dashboard;
