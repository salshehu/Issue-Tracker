import { DevsSchemaPatch } from "@/_lib/schemaValidation";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const dev = await prisma.devs.findUnique({ where: { id: params.id } });

  if (!dev) return NextResponse.json("Record not found", { status: 404 });

  return NextResponse.json(dev);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const patchdata = await request.json();

  const checkData = DevsSchemaPatch.safeParse(patchdata);

  if (!checkData.success)
    return NextResponse.json(checkData.error.format(), { status: 400 });

  const findData = await prisma.devs.findUnique({
    where: { id: params.id },
  });

  if (!findData)
    return NextResponse.json("Record does not exist", { status: 404 });

  const updated = await prisma.devs.update({
    where: { id: params.id },
    data: {
      userName: checkData.data.userName,
      firstName: checkData.data.firstName,
      lastName: checkData.data.lastName,
      email: checkData.data.email,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const delDate = await request.json();

  const searchDate = await prisma.devs.findUnique({
    where: { id: params.id },
  });

  if (!searchDate)
    return NextResponse.json("No such record exists", { status: 404 });

  const res = await prisma.devs.delete({ where: { id: params.id } });

  return NextResponse.json({ action: "delete", mssg: res });
}
