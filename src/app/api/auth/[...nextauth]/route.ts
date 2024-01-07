import NextAuth from "next-auth";
import { authOptions } from "../../../../_lib/authOptions";

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
