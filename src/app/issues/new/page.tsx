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
import Spinner from "@/app/components/Spinner";

// interface IssueForm {
//   title: string;
//   description: string;
// }

type IssueForm = z.infer<typeof createIssueschema>;

const NewIssue = () => {
  const route = useRouter();
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueschema),
  });

  const submitForm = handleSubmit(async (data) => {
    try {
      setIsSending(true);
      const res = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw "entries are invalid";
      route.push("/issues");
    } catch (err) {
      setIsSending(false);
      setError(`Something went wrong, ${err}`);
    }
  });

  return (
    <form className="p-5 space-y-3" onSubmit={submitForm}>
      <TextField.Root className="max-w-xl ">
        <TextField.Input placeholder="Title..." {...register("title")} />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMde placeholder="Description..." {...field} />
        )}
      />

      <ErrorMessage>{errors.description?.message}</ErrorMessage>

      <Button disabled={isSending}>
        {isSending ? <Spinner /> : "Submit New Issue"}
      </Button>
    </form>
  );
};

export default NewIssue;
