import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { z } from "zod";
import { DevsSchema } from "@/_lib/schemaValidation";

export async function GET(request: NextRequest) {
  const res = await prisma.developers.findMany();

  if (!res) NextResponse.json("No record found", { status: 404 });

  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  const post = await request.json();

  const checkdev = DevsSchema.safeParse(post);

  if (!checkdev.success)
    return NextResponse.json("Invalid entries, check again", { status: 400 });

  const newDev = await prisma.developers.create({
    data: {
      userName: checkdev.data.userName,
      firstName: checkdev.data.firstName,
      lastName: checkdev.data.lastName,
      email: checkdev.data.email,
      contract: checkdev.data.contract,
      profilePic: checkdev.data.profilePic,
      address: checkdev.data.address,
    },
  });

  return NextResponse.json(newDev, { status: 201 });
}
