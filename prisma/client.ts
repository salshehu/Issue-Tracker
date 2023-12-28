import { PrismaClient } from "@prisma/client";

const prismaClientSingleTon = () => {
  return new PrismaClient(); // return new PrismaClient({ log: ["query"] });
};

type PrismaClientSingleTon = ReturnType<typeof prismaClientSingleTon>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleTon | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleTon();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
