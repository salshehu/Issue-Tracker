"use client";

import { Spinner } from "@/_components";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { authOptions } from "./api/auth/[...nextauth]/route";

const NavBar = () => {
  //getting user session in client comp
  const { data: session, status } = useSession();

  //getting user session in a server comp.
  // const sessn = await getServerSession(authOptions);

  const path = usePathname();

  const links = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Dashboard", href: "/dashboard" },
    { id: 3, label: "Issues", href: "/issues/lists" },
    { id: 4, label: "About", href: "/info" },
  ];

  return (
    <nav className="flex justify-between border-b p-3  h-14 mb-5 mt-2 ">
      <Flex className="items-center justify-center">
        <Flex className="flex-col place-items-center me-7 bg-slate-200">
          <Link href="/" className="place-items-center mt-2 p-2 ">
            <div className="">
              <AiFillBug size="27" color="brown" />
            </div>
            <p className="font-semibold text-center text-sm">Symbiotic</p>
          </Link>
        </Flex>

        <nav className="justify-items-end">
          <ul className="flex space-x-2 ">
            {links.map((link) => (
              <li
                key={link.id}
                className={`${
                  path === link.href
                    ? "text-zinc-900 border-t-2 border-red-300"
                    : "text-zinc-500"
                } hover:text-zinc-800 transition-colors`}
              >
                <Link href={link.href}> {link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Flex>
      <Box className="items-center justify-center">
        {status === "authenticated" && (
          <div>
            <span>{session.user?.email}</span>
            <span>{session.user?.image && session.user.image}</span>
            <Link href="/api/auth/signout">Sign Out</Link>
          </div>
        )}
        {status === "unauthenticated" && <Link href="/login">Sign In</Link>}
      </Box>
    </nav>
  );
};

export default NavBar;
