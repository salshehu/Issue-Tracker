"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssue = () => {
  return (
    <div className="p-5 space-y-3">
      <TextField.Root className="max-w-xl ">
        <TextField.Input placeholder="Title..." />
      </TextField.Root>
      <SimpleMde placeholder="Issue details..." />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssue;
