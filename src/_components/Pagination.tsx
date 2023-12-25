"use client";
import { Button, Flex } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

interface Props {
  pageSize: number;
  itemsCount: number;
  currentPage: number;
}

const Pagination = ({ pageSize, itemsCount, currentPage }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageCounts = Math.ceil(itemsCount / pageSize);

  if (pageCounts <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex gap="2" justify="end" align="center" my="2">
      page {currentPage} of {pageCounts}
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <BsChevronDoubleLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <BsChevronLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCounts}
        onClick={() => changePage(currentPage + 1)}
      >
        <BsChevronRight />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCounts}
        onClick={() => changePage(pageCounts)}
      >
        <BsChevronDoubleRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
