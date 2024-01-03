"use client";
import ErrorMessage from "@/_components/ErrorMessage";
import Spinner from "@/_components/Spinner";
import { IssueSchema } from "@/_lib/schemaValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Developers, Issue, Status } from "@prisma/client";
import { Button, Select, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMde from "react-simplemde-editor";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

type IssueFormData = z.infer<typeof IssueSchema>;

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
    resolver: zodResolver(IssueSchema),
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
    staleTime: 60 * 1000, //list of entries will be cached for 60s i.e. 1min
  });

  //list of possible statuses
  const status: Status[] = ["OPEN", "IN_PROGRESS", "CLOSED"];

  //final form submission handler
  const submitForm = handleSubmit(async (data) => {
    try {
      setIsSending(true);
      let res;

      if (issue) {
        res = await fetch("/api/issues/" + issue.Id, {
          method: "PATCH",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Sorry, unable to post data");
        toast.success("Issue was successfully updated ", {
          position: "top-right",
        });
      } else {
        res = await fetch("/api/issues", {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Sorry, update operation failed");
        toast.success("Issue was saved successfully", {
          position: "top-right",
        });
      }

      route.push("/issues");
      route.refresh();
    } catch (err) {
      setIsSending(false);
      setError(`Something went wrong, ${err}`);
      toast.error("something went wrong!", { position: "top-right" });
      console.log(err);
    }
  });

  // const dloper =
  //   // issue?.devId &&
  //   devs?.find((dev) => {
  //     dev.Id === issue.devId;
  //     return dev.userName;
  //   });

  const developer = devs?.find((dev) => dev.Id === issue?.devId);

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
            <option defaultValue={issue?.status || "OPEN"}>
              {issue?.status || "Set Status.."}
            </option>
            {status?.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          <ErrorMessage>{errors.status?.message}</ErrorMessage>
        </>
        <>
          <select {...register("devId")}>
            <option value={developer?.Id || undefined}>
              {developer?.userName || "Assign Issue..."}
            </option>
            {devs?.map((dev) => (
              <option key={dev.Id} value={dev.Id}>
                {dev.userName}
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
        <DeleteIssueBtn id={issue?.Id!} />
        <Button onClick={() => route.back()}>Cancel</Button>
      </div>
      <Toaster />
    </form>
  );
};

export default IssueForm;

// text={issue ? "Updating..." : "Submitting..."}
