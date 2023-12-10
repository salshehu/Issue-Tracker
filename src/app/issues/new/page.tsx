"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMde from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const route = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className="p-5 space-y-3"
      onSubmit={handleSubmit(async (data) => {
        const res = await fetch("/api/issues", {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify(data),
        });

        route.push("/issues");

        console.log(res.json);
      })}
    >
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
