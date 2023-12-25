"use client";
import ErrorMessage from "@/_components/ErrorMessage";
import Spinner from "@/_components/Spinner";
import { Issueschema } from "@/_lib/schemaValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Developers, Issue, Status } from "@prisma/client";
import { Button, Select, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMde from "react-simplemde-editor";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import DeleteIssueBtn from "../[id]/DeleteIssueBtn";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

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

  //fetch developers
  const {
    data: devs,
    error: errr,
    isLoading,
  } = useQuery<Developers[]>({
    queryKey: ["assignees"],
    queryFn: async () =>
      await fetch("/api/devs")
        .then((res) => res.json())
        .catch((e) => console.log(e)),
    retry: 3,
    staleTime: 60 * 1000, //list of entries will be cached for 60s i.e. 1mins
  });

  //list of possible statuses
  const status: Status[] = ["OPEN", "IN_PROGRESS", "CLOSED"];

  //final form submission handler
  const submitForm = handleSubmit(async (data) => {
    console.log(data);

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

      if (!res.ok) return new Error("entries are invalid");

      route.push("/issues");
      route.refresh();
    } catch (err) {
      setIsSending(false);
      setError(`Something went wrong, ${err}`);
      toast.error("something went wrong");
      console.log(err);
    }
  });

  const devUserName = (issue: Issue) => {
    const selectDev = devs?.find((dev) => dev.id === issue?.devId);

    return selectDev?.userName;
  };

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

      <div className="flex gap-2 justify-around">
        <>
          <select {...register("status")} placeholder="Status">
            {status?.map((st) => (
              <option key={st} value={st} defaultValue={issue?.status || st}>
                {issue ? issue?.status : st}
              </option>
            ))}
          </select>

          <ErrorMessage>{errors.status?.message}</ErrorMessage>
        </>
        <>
          <select {...register("devId")} placeholder="Assign Issue...">
            <option>unassigned</option>
            {devs?.map((dev) => (
              <option
                key={dev.id}
                value={issue?.devId || dev.id}
                defaultValue={issue?.devId ? devUserName(issue) : "null"}
              >
                {dev.userName || "unassigned"}
              </option>
            ))}
          </select>

          <ErrorMessage>{errors.devId?.message}</ErrorMessage>
        </>
      </div>

      <div className="mt-3 flex items-end justify-end gap-2">
        <Button disabled={isSending}>
          {isSending ? (
            <Spinner text={issue ? "Updating..." : "Submitting..."} />
          ) : issue ? (
            "Update Issue"
          ) : (
            "Submit Issue"
          )}
        </Button>
        <DeleteIssueBtn id={issue?.id!} />
        <Button onClick={() => route.back()}>Cancel</Button>
      </div>
    </form>
  );
};

export default IssueForm;
