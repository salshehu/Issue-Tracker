"use client";
import { DevsSchema } from "@/_lib/schemaValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contract } from "@prisma/client";
import { Button, Select } from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Developers } from "@prisma/client";
import { z } from "zod";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/_components";

interface CloudinaryResult {
  secure_url: string;
}

type devFormData = z.infer<typeof DevsSchema>;

const DevForm = ({ dev }: { dev?: Developers }) => {
  const route = useRouter();
  const [publicId, setPublicId] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<devFormData>({ resolver: zodResolver(DevsSchema) });

  const contract: Contract[] = ["FULL_TIME", "PART_TIME", "OUTSOURCED"];

  const onSubmit = handleSubmit(async (data) => {
    data = { ...data, profilePic: publicId };
    try {
      setIsSending(true);
      let res;

      if (dev) {
        res = await fetch("/api/devs/" + dev.Id, {
          method: "PATCH",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Sorry, unable to post data");
        toast.success("Profile was successfully updated ", {
          position: "bottom-right",
        });
      } else {
        res = await fetch("/api/devs", {
          method: "POST",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Sorry, update operation failed");
        toast.success("Developer was saved successfully", {
          position: "bottom-right",
        });
      }

      route.push("/dlopers");
      route.refresh();
    } catch (err) {
      setIsSending(false);
      setError(`Something went wrong, ${err}`);
      toast.error("something went wrong!", { position: "top-right" });
    }
    setIsSending(false);
  });

  return (
    <div>
      <form onSubmit={onSubmit} className="border p-3 gap-2 flex-col ">
        <fieldset className=" flex-col border">
          <label className="labelDevForm" htmlFor="firstName">
            First Name :
            <input
              autoFocus
              {...register("firstName")}
              defaultValue={dev?.firstName}
              type="text"
              placeholder="Maiden"
              name="firstName"
              className="inputDevForm"
            />
          </label>
          <label className="labelDevForm" htmlFor="lastName">
            Last Name :
            <input
              {...register("lastName")}
              defaultValue={dev?.lastName}
              type="text"
              placeholder="Surn Name"
              name="lastName"
              className="inputDevForm "
            />
          </label>
          <label className=" labelDevForm" htmlFor="userName">
            User Name :
            <input
              {...register("userName")}
              defaultValue={dev?.userName || ""}
              type="text"
              placeholder="User Name"
              name="userName"
              className="inputDevForm"
            />
          </label>
          <label className="labelDevForm" htmlFor="email">
            Email :
            <input
              {...register("email")}
              defaultValue={dev?.email}
              type="text"
              placeholder="Address "
              name="email"
              className="inputDevForm"
            />
          </label>
        </fieldset>
        <fieldset className=" flex-col border">
          <label className=" labelDevForm" htmlFor="address">
            Address :
            <input
              {...register("address")}
              defaultValue={dev?.address || ""}
              type="text"
              placeholder="Location "
              name="address"
              className="inputDevForm"
            />
          </label>
          <label className=" labelDevForm " htmlFor="contract">
            Contract :
            <select {...register("contract")}>
              <option defaultValue={dev?.contract} value={""}>
                {dev?.contract || "Mode"}
              </option>
              {contract.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
        <div className="my-3 justify-end">
          {publicId && (
            <CldImage
              src={dev?.profilePic || publicId}
              width={170}
              height={80}
              alt="Uploaded image not available"
            />
          )}
          Click here to upload or change{"  "}
          <CldUploadWidget
            uploadPreset="djwmg0vw"
            onUpload={(result, widget) => {
              if (result.event !== "success") return;
              const info = result.info as CloudinaryResult;
              setPublicId(info.secure_url);
            }}
          >
            {({ open }) => (
              <input
                type="submit"
                onClick={() => open()}
                value={"Image"}
                className=" italic underline text-violet-500"
              />
            )}
          </CldUploadWidget>
        </div>
        <Button disabled={isSending}>
          {isSending ? (
            <Spinner text={dev ? "Updating..." : "Submitting..."} />
          ) : dev ? (
            "Update"
          ) : (
            "Submit"
          )}
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default DevForm;
