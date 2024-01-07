import { DevsSchema } from "@/_lib/schemaValidation";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { Id: string } }
) {
  const dev = await prisma.developers.findUnique({ where: { Id: params.Id } });

  if (!dev) return NextResponse.json("Record not found", { status: 404 });

  return NextResponse.json(dev);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const patchdata = await request.json();

  const checkData = DevsSchema.safeParse(patchdata);

  if (!checkData.success)
    return NextResponse.json(checkData.error.format(), { status: 400 });

  const findData = await prisma.developers.findUnique({
    where: { Id: params.id },
  });

  if (!findData)
    return NextResponse.json("Record does not exist", { status: 404 });

  console.log(checkData.data);

  const updated = await prisma.developers.update({
    where: { Id: params.id },
    data: {
      userName: checkData.data.userName,
      firstName: checkData.data.firstName,
      lastName: checkData.data.lastName,
      email: checkData.data.email,
      contract: checkData.data.contract,
      profilePic: checkData.data.profilePic,
      address: checkData.data.address,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchData = await prisma.developers.findUnique({
    where: { Id: params.id },
  });

  if (!searchData)
    return NextResponse.json("No such record exists", { status: 404 });

  const res = await prisma.developers.delete({ where: { Id: params.id } });

  return NextResponse.json({ action: "delete succesfull", mssg: res });
}
