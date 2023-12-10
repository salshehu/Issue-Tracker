"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssue = () => {
  return (
    <div className="p-5 space-y-3">
      <TextField.Root className="max-w-xl ">
        <TextField.Input placeholder="Title..." />
      </TextField.Root>
      <TextArea placeholder="Issue details..." />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssue;
