import { Issueschema } from "@/lib/schemaValidation";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

// POST fn to create new issue:
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const checkvalid = Issueschema.safeParse(body);

  if (!checkvalid.success)
    return NextResponse.json(checkvalid.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json(
      { error: "No such record exist" },
      { status: 404 }
    );

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!id) return NextResponse.json("Not found", { status: 404 });

  const del = await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({ mssg: del });
}
