import { Button } from "@radix-ui/themes";
import React from "react";
import { BsPencil } from "react-icons/bs";

const EditIssueBtn = () => {
  return (
    <Button>
      <BsPencil /> Edit
    </Button>
  );
};

export default EditIssueBtn;
