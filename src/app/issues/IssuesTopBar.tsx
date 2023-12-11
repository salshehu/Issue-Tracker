import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssuesTopBar = () => {
  return (
    <div className="flex flex-row justify-between mb-3">
      <h2 className="h-3">Issue List</h2>
      <Button>
        <Link href="/issues/new">Add New</Link>
      </Button>
    </div>
  );
};

export default IssuesTopBar;
