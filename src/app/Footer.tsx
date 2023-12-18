import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="items-center justify-center text-sm">
      <span>
        <span>&copy;</span>
        <Link href="/" className="text-blue-600 m-1">
          Symbiotic Bug Tracker Inc.
        </Link>
      </span>
      <span className="italic">All rights reserved</span>
    </footer>
  );
};

export default Footer;
