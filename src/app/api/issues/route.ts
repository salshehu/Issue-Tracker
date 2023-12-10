import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import prisma from "../../../../prisma/client";

const createIssueschema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(1),
});

// POST fn to create new issue:
export async function POST(request: NextRequest) {
  const issue = await request.json();
  const checkvalid = createIssueschema.safeParse(issue);

  if (!checkvalid) return NextResponse.json(checkvalid, { status: 400 });

  const newissue = await prisma.issue.create({
    data: {
      title: issue.title,
      description: issue.description,
    },
  });

  return NextResponse.json(newissue, { status: 201 });
}

// GET function to retrieve all issues:
export async function GET(request: NextRequest) {
  const allIssues = await prisma.issue.findMany();

  if (!allIssues) return NextResponse.json("No record found", { status: 404 });

  return NextResponse.json(allIssues);
}
