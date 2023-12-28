import { IssueSchema } from "@/_lib/schemaValidation";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { Issue } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: { Id: parseInt(params.id) },
  });

  if (!issue) return NextResponse.json("Record not found", { status: 404 });

  return NextResponse.json(issue);
}

// POST fn to edit issue:
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const Id = parseInt(params.id) || 0;

  const body = await request.json();
  const checkvalid = IssueSchema.safeParse(body);

  if (!checkvalid.success)
    return NextResponse.json(checkvalid.error.format(), { status: 400 });

  const { data: update } = checkvalid;

  const issue = await prisma.issue.findUnique({
    where: { Id },
  });

  if (!issue)
    return NextResponse.json(
      { error: "No such record exist" },
      { status: 404 }
    );

  const updatedIssue = await prisma.issue.update({
    where: { Id: issue.Id },
    data: {
      title: update.title!,
      description: update.description!,
      dateCompleted: update.dateCompleted!,
      status: update.status,
      devId: update.devId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = await prisma.issue.findUnique({
    where: { Id: parseInt(params.id) },
  });

  if (!id) return NextResponse.json("Record not found", { status: 404 });

  const del = await prisma.issue.delete({
    where: { Id: parseInt(params.id) },
  });

  return NextResponse.json({ action: "delete", mssg: del });
}
