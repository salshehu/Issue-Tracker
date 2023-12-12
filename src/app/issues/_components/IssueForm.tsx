"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { createIssueschema } from "@/lib/schemaValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// dynamic fn to laxy load component giving error by disabling SSR on the comp.
const SimpleMde = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// interface IssueForm {
//   title: string;
//   description: string;
// }

type IssueFormData = z.infer<typeof createIssueschema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const route = useRouter();
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
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
    <form className="max-w-2xl p-5 space-y-3" onSubmit={submitForm}>
      <TextField.Root className="max-w-xl ">
        <TextField.Input
          defaultValue={issue?.title}
          placeholder="Title..."
          {...register("title")}
        />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
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

export default IssueForm;