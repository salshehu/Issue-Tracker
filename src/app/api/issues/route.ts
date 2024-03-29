import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { IssueSchema } from "../../../_lib/schemaValidation";

// POST fn to create new issue:
export async function POST(request: NextRequest) {
  const issue = await request.json();
  const checkvalid = IssueSchema.safeParse(issue);

  if (!checkvalid.success)
    return NextResponse.json(checkvalid.error.errors, { status: 400 });

  const { title, description, status, devId, dateCompleted } = checkvalid.data;

  const newissue = await prisma.issue.create({
    data: { title, description, status, devId, dateCompleted },
  });

  return NextResponse.json(newissue, { status: 201 });
}

// GET function to retrieve all issues:
export async function GET(request: NextRequest) {
  const allIssues = await prisma.issue.findMany();

  if (!allIssues) return NextResponse.json("No record found", { status: 404 });

  return NextResponse.json(allIssues);
}
