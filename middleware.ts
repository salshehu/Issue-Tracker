export { default } from "next-auth/middleware";

// import NextAuth from "next-auth/next";
// import { authOptions } from "@/_lib/authOptions";

// export default NextAuth(authOptions).auth;
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.png |.jpg ).*)"],
};
