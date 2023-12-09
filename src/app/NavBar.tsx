"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const path = usePathname();

  const links = [
    { id: 1, label: "Dashboard", href: "/" },
    { id: 2, label: "Issues", href: "/issues" },
    { id: 3, label: "Audit", href: "/audit" },
  ];

  return (
    <header className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>

      <nav>
        <ul className="flex space-x-5 ">
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
    </header>
  );
};

export default NavBar;
