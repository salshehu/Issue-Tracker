import { Button, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssuesTopBar = () => {
  return (
    <div className="flex flex-row justify-between mb-3">
      <Heading as="h3">Issue List</Heading>
      <Button>
        <Link href="/issues/new">Add New</Link>
      </Button>
    </div>
  );
};

export default IssuesTopBar;
