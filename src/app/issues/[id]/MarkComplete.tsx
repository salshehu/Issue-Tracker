"use client";
import { Issue } from "@prisma/client";
import { Box, Checkbox, Flex, TextFieldInput } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  issue: Issue;
}

const MarkComplete = ({ issue }: Props) => {
  // const [dateChecked, setDateChecked] = useState<Date | null>(null);
  const router = useRouter();
  const dateRef = useRef<HTMLInputElement>(null);
  const [isMarked, setIsMarked] = useState(false);

  const submitDate = async (e: ChangeEvent) => {
    e.preventDefault();

    const data: Issue = {
      ...issue,
      dateCompleted: dateRef.current?.value as unknown as Date,
    };

    try {
      const res = await fetch("/api/issues/" + issue.Id, {
        method: "PATCH",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Sorry, unable to update issue");
      toast.success("Issue was successfully updated ", {
        position: "bottom-right",
      });
      setIsMarked(false);
      router.push("/issues/" + issue.Id);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Operation could not complete successfully");
      setIsMarked(false);
    }
  };

  return (
    <Flex direction={"column"}>
      <Box className="flex items-center align-middle gap-2 mt-2 pl-2">
        <input
          type="checkbox"
          className="border"
          checked={isMarked}
          onChange={(e) => setIsMarked(!isMarked)}
        />
        Mark date completed
      </Box>

      {isMarked && (
        <TextFieldInput
          ref={dateRef}
          onChange={submitDate}
          type="date"
          className="ml-2"
        />
      )}
      <Toaster />
    </Flex>
  );
};

export default MarkComplete;

// value={dateChecked}
