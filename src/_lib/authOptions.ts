import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import { User } from "@prisma/client";

// interface Credentials extends Record<"email" | "password", string> {}

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) throw new Error();

    return user;
  } catch (error) {
    console.error("Invalid user credentials:", error);
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    // OAuth authentication providers...
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID!,
    //   clientSecret: process.env.FACEBOOK_SECRET!,
    // }),
    GoogleProvider({
      id: "google",
      name: "google",
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},

      authorize: async (credentials) => {
        if (!credentials) return null;

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);
        console.log("user credential is been queried");

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.hashedPassword!
          );

          if (passwordsMatch) return user;

          return null as any;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60, // 3 hours
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ profile, account }) {
      if (!profile) return true;

      const user = await prisma.user.findUnique({
        where: { email: profile?.email },
      });

      if (!user)
        await prisma.user.create({
          data: {
            email: profile?.email,
            name: profile?.name,
            image: profile?.image,
          },
        });

      return true;
    },
  },
  // adapter: PrismaAdapter(prisma),
};

/*** // @ts-ignore ***/
