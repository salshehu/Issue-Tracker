import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
// import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../../prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import { User } from "@prisma/client";

// interface Credentials extends Record<"email" | "password", string> {}

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: email },
    });
    if (user) return user;
    return;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
    return;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // @ts-ignore
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    GoogleProvider({
      id: "google",
      name: "google",
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      // @ts-ignore
      async authorize(credentials) {
        if (!credentials) return null;

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);
        console.log("credentials is been queried");

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(
            password,
            user.hashedPassword!
          );

          if (passwordsMatch) return user;

          console.log("Invalid credentials");
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ profile }) {
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
      console.log(user);

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// CredentialsProvider({
//   id:'credentials',
//   name: "Credentials",
//   // credentials: {
//   //   username: { label: "Username", placeholder: "username" },
//   //   email: { label: "Email", type: "email", placeholder: "Email" },
//   //   password: {
//   //     label: "Password",
//   //     type: "password",
//   //     placeholder: "Password",
//   //   },
//   // },
//   async authorize(credentials, req) {
//     if (!credentials?.email || credentials.username) return null;

//     const user = await prisma.user.findUnique({
//       where: { email: credentials.email },
//     });

//     if (!user) return null;

//     const passCheck = await bcrypt.compare(
//       credentials.password,
//       user.hashedPassword
//     );

//     return passCheck ? user : null;
//   },
// }),
// Passwordless / email sign in
// EmailProvider({
//   server: process.env.MAIL_SERVER,
//   from: "NextAuth.js <no-reply@example.com>",
// }),
