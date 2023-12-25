"use client";

import { Skeleton, Spinner } from "@/_components";
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { BsPerson } from "react-icons/bs";

const NavBar = () => {
  //getting user session in a server comp.
  // const sessn = await getServerSession(authOptions);

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
        <NavLinks />
      </Flex>
      <AuthStatus />
    </nav>
  );
};

const NavLinks = () => {
  const path = usePathname();

  const links = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Dashboard", href: "/dashboard" },
    { id: 3, label: "Issues", href: "/issues" },
    { id: 4, label: "About", href: "/info" },
  ];

  return (
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
  );
};

const AuthStatus = () => {
  //getting user session in client comp
  const { data: session, status } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated") return <Link href="/login">Sign In</Link>;

  return (
    <Box className="items-center justify-center">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user?.image!}
            fallback={<BsPerson />}
            size="2"
            radius="full"
            referrerPolicy="no-referrer"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content color="indigo" className="border-blue-400">
          <DropdownMenu.Label>
            <span>{session!.user?.email}</span>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Sign Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
