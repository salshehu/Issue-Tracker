import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { create } from "domain";

export async function GET(request: NextRequest) {
  const req = await prisma.devs.findMany({
    select: {
      userName: true,
      issues: {
        select: {
          title: true,
          description: true,
          createdAt: true,
          dateCompleted: true,
        },
      },
    },
  });

  if (!req) return NextResponse.json("No records exists", { status: 404 });

  return NextResponse.json(req);
}

export async function POST(request: NextRequest) {
  const req = await request.json();

  if (!req) return NextResponse.json("Invalid data", { status: 400 });

  const data = await prisma.issue.create({
    data: {
      title: req.title,
      description: req.description,
      status: req.status,
    },
  });

  return NextResponse.json(data);
}
