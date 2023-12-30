import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import SearchBox from "./SearchBox";

const IssuesTopBar = () => {
  return (
    <div className="flex flex-row justify-between my-3">
      <SearchBox />
      <Button>
        <Link href="/issues/new">Add New</Link>
      </Button>
    </div>
  );
};

export default IssuesTopBar;
