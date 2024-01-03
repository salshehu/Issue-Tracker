"use client";
import { Button, Flex, TextFieldInput } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDebouncedCallback } from "use-debounce";

const SearchBox = () => {
  // const [search, setSearch]=useState('')
  const qref = useRef<HTMLInputElement>(null);
  const path = usePathname();
  const { replace, push } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleSearch = useDebouncedCallback(() => {
    const qry = qref.current?.value;
    if (qry) {
      qry.length > 2 && params.set("q", qry);
    } else {
      params.delete("q");
    }
    replace(`${path}?${params}`);
  }, 350);

  return (
    <Flex align={"center"} gap={"1"}>
      <TextFieldInput
        className="border-0"
        placeholder="Search Issue"
        // value={search}
        // onChange={(e) =>  setSearch(e.target.value) }
        ref={qref}
        onChange={handleSearch}
      />
      <Button onClick={() => handleSearch()}>
        <BsSearch />
      </Button>
    </Flex>
  );
};

export default SearchBox;
