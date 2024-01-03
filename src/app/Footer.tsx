import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="items-center content-between text-sm">
      <span>
        <span>&copy;</span>
        <Link href="/" className="text-violet-600 ml-1 mr-5">
          Symbiotic Bug Tracker Inc.
        </Link>
      </span>
      <span className="italic">All rights reserved</span>
    </footer>
  );
};

export default Footer;
