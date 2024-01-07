"use client";

import { Spinner } from "@/_components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsTrash } from "react-icons/bs";

const DeleteDevBtn = ({ id }: { id: string }) => {
  const router = useRouter();

  const [err, setErr] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);

  const deleteHandler = async () => {
    console.log(id);

    try {
      setisDeleting(true);
      const res = await fetch(`/api/devs/${id}`, {
        method: "DELETE",
      });

      console.log(res);
      if (!res.ok) throw new Error("Sorry!, server error prevented this");
      toast.success("Profile was successfully deleted", {
        position: "bottom-right",
      });
      router.push("/dlopers");
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
          <AlertDialog.Title>Error deleting Profile</AlertDialog.Title>
          <AlertDialog.Description>
            Oops! Couldn't delete developer, something went wrong along the way.
            Try again.
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
                onClick={() => router.push("/dlopers")}
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <Toaster />
    </>
  );
};

export default DeleteDevBtn;
