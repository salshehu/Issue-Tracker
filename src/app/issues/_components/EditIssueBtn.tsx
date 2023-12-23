"use client";
import { Button } from "@radix-ui/themes";
import React, { ReactNode } from "react";
import { BsPencil } from "react-icons/bs";

const EditIssueBtn = () => {
  return (
    <Button className="text-sm">
      <BsPencil />
      Edit
    </Button>
  );
};

export default EditIssueBtn;
