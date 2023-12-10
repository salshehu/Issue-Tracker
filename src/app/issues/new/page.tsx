"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMde from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillWarning } from "react-icons/ai";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const route = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const [error, setError] = useState("");

  return (
    <form
      className="p-5 space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          const res = await fetch("/api/issues", {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(data),
          });
          if (!res.ok) throw "entries are invalid";
          route.push("/issues");
        } catch (err) {
          setError(`Something went wrong, ${err}`);
        }
      })}
    >
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <AiFillWarning />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <TextField.Root className="max-w-xl ">
        <TextField.Input placeholder="Title..." {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMde placeholder="Description..." {...field} />
        )}
      />

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssue;
