"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issueschema } from "@/lib/schemaValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMde from "react-simplemde-editor";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// dynamic fn to laxy load component giving error by disabling SSR on the comp.
// const SimpleMde = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// });

// interface IssueForm {
//   title: string;
//   description: string;
// }

type IssueFormData = z.infer<typeof Issueschema>;

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
    resolver: zodResolver(Issueschema),
  });

  const submitForm = handleSubmit(async (data) => {
    try {
      setIsSending(true);
      let res;

      if (issue) {
        res = await fetch("/api/issues/" + issue.id, {
          method: "PATCH",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify(data),
        });
      } else {
        res = await fetch("/api/issues", {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify(data),
        });
      }

      if (!res.ok) throw "entries are invalid";

      route.push("/issues");
      route.refresh();
    } catch (err) {
      setIsSending(false);
      setError(`Something went wrong, ${err}`);
    }
  });

  return (
    <form className="max-w-2xl p-5 space-y-3" onSubmit={submitForm}>
      <TextField.Root>
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
        {issue ? "Update Issue" : "Submit Issue"}
        {isSending && <Spinner text={issue ? "Updating" : "Submitting"} />}
      </Button>
    </form>
  );
};

export default IssueForm;
