import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const assignments = await prisma.developers.findMany({
    where: { Id: params.id },
    select: {
      issues: {
        select: {
          dateCompleted: true,
          createdAt: true,
          title: true,
          description: true,
          status: true,
          Id: true,
        },
      },
    },
  });

  if (!assignments) return NextResponse.json("No such record found");

  return NextResponse.json(assignments);
}
