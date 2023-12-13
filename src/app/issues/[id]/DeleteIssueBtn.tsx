"use client";

import EditDeleteBtn from "@/app/components/EditDeleteBtn";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { BsTrash } from "react-icons/bs";

const DeleteIssueBtn = ({ id }: { id: number }) => {
  const router = useRouter();

  const clickHandler = async () => {
    try {
      await fetch(`/api/issues/${id}`, {
        method: "DELETE",
      });

      router.push("/issues");
      router.refresh();
    } catch (error) {
      throw Error("Issue could not be deleted");
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        {/* <EditDeleteBtn
          text="Delete"
          color="red"
          icon={<BsTrash />}
          clickHandler={clickHandler}
        /> */}
        <Button color="red" variant="surface">
          <BsTrash />
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm delete</AlertDialog.Title>
        <AlertDialog.Description>Are you sure?</AlertDialog.Description>
        <Flex>
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="orange" variant="surface" onClick={clickHandler}>
              {" "}
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueBtn;
