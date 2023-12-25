"use client";

import { Spinner } from "@/_components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";

const DeleteIssueBtn = ({ id }: { id: number }) => {
  const router = useRouter();

  const [err, setErr] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);

  const deleteHandler = async () => {
    try {
      setisDeleting(true);
      const res = await fetch(`/api/issues/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) return setErr(true);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setErr(true);
      setisDeleting(false);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          {/* <EditDeleteBtn
          text="Delete"
          color="red"
          icon={<BsTrash />}
          clickHandler={clickHandler}
        /> */}
          <Button color="red" variant="surface" disabled={isDeleting}>
            {!isDeleting && <BsTrash />}
            {!isDeleting && "Delete"}
            {isDeleting && <Spinner text="Deleting..." />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm delete</AlertDialog.Title>
          <AlertDialog.Description>Are you sure?</AlertDialog.Description>
          <Flex className="mt-2">
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="orange" variant="surface" onClick={deleteHandler}>
                {" "}
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={err}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error deleting issue</AlertDialog.Title>
          <AlertDialog.Description>
            Oops! Couldn't delete issue, something went wrong along the way. Try
            again.
          </AlertDialog.Description>
          <Flex gap={"3"} align={"center"} mt={"2"}>
            <AlertDialog.Action>
              <Button
                color="plum"
                variant="ghost"
                onClick={() => setErr(false)}
                className="w-9"
              >
                OK
              </Button>
            </AlertDialog.Action>
            <AlertDialog.Cancel>
              <Button
                color="red"
                variant="surface"
                onClick={() => router.push("/issues")}
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueBtn;
