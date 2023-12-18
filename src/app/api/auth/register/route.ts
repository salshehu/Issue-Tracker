import { RegisterFormSchema } from "@/_lib/schemaValidation";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const bodyCheck = RegisterFormSchema.safeParse(body);

  // if (!bodyCheck.success)
  //   return NextResponse.json("Invalid data entries", { status: 400 });

  const existCheck = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existCheck)
    return NextResponse.json("User already exists", { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password1, 10);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      organisation: body.organisation,
      country: body.country,
      email: body.email,
      hashedPassword,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
