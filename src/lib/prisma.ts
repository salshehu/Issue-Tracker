import { PrismaClient } from "@prisma/client";

const prismaClientSingleTon = () => {
  return new PrismaClient();
};

type PrismaClientSingleTon = ReturnType<typeof prismaClientSingleTon>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleTon | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleTon();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
