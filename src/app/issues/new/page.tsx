"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMde from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueschema } from "@/lib/schemaValidation";
import ErrorMessage from "@/app/components/ErrorMessage";

// interface IssueForm {
//   title: string;
//   description: string;
// }

type IssueForm = z.infer<typeof createIssueschema>;

const NewIssue = () => {
  const route = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueschema),
  });

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
      <TextField.Root className="max-w-xl ">
        <TextField.Input placeholder="Title..." {...register("title")} />
      </TextField.Root>
      {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMde placeholder="Description..." {...field} />
        )}
      />
      {errors.description && (
        <ErrorMessage>{errors.description.message}</ErrorMessage>
      )}

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssue;
