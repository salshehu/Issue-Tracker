import { Button, Flex } from "@radix-ui/themes";
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
  const pageCounts = Math.ceil(itemsCount / pageSize);

  if (pageCounts <= 1) return null;

  return (
    <Flex gap="2" justify="end" align="center" my="2">
      page {currentPage} of {pageCounts}
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <BsChevronDoubleLeft />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <BsChevronLeft />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCounts}>
        <BsChevronRight />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCounts}>
        <BsChevronDoubleRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
