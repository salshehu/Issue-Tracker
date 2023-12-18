"use client";
import { Spinner } from "@/_components";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { RegisterFormSchema } from "@/_lib/schemaValidation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

type formSchema = z.infer<typeof RegisterFormSchema>;

const RegisterPage = () => {
  const [isSending, setIsSending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchema>({ resolver: zodResolver(RegisterFormSchema) });
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsSending(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) return new Error("Sorry, couldn't submit the data...");
      router.replace("/login?registration&success");
      console.log(data);
      console.log(res.json);
    } catch (err) {
      setIsSending(false);
      return new Error();
    }
  };
  return (
    <div className="place-items-center h-screen grid">
      <div className="flex flex-col p-3 w-[25rem] rounded-md border-2 border-t-4 border-violet-300 shadow-sm">
        <Text className="font-semibold text-center my-4">
          Kindly provide your registration details
        </Text>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-3 gap-5"
        >
          <label className="">
            Enter your full name<span className="text-red-700">*</span>
            <input
              {...register("name")}
              placeholder="Full name"
              type="text"
              className="p-2 border block"
            />
          </label>
          {errors.name && (
            <p className="text-red-600">{errors.name?.message}</p>
          )}
          <label>
            Name of company / organisation
            <input
              {...register("organisation")}
              placeholder="Organisation"
              type="text"
              className="p-2 border block"
            />
          </label>
          {errors.organisation && (
            <p className="text-red-600">{errors.organisation?.message}</p>
          )}
          <label>
            Country
            <input
              {...register("country")}
              placeholder="Country"
              type="text"
              className="p-2 border block"
            />
          </label>
          {errors.country && (
            <p className="text-red-600">{errors.country?.message}</p>
          )}
          <label>
            email<span className="text-red-700">*</span>
            <input
              {...register("email")}
              placeholder="johnsmith@maildev.com"
              type="email"
              className=" p-2 border block"
            />
          </label>
          {errors.email && (
            <p className="text-red-600">{errors.email?.message}</p>
          )}
          <label>
            Enter password<span className="text-red-700">*</span>
            <input
              {...register("password1")}
              placeholder="Password"
              type="password"
              className="p-2 border block"
            />
          </label>
          {errors.password1 && (
            <p className="text-red-600">{errors.password1?.message}</p>
          )}
          <label>
            Re-enter passowrd<span className="text-red-700">*</span>
            <input
              {...register("password2")}
              placeholder="Re-type Password"
              type="password"
              className="p-2 border block"
            />
          </label>
          {errors.password2 && (
            <p className="text-red-600">{errors.password2.message}</p>
          )}
          <Button className="cursor-pointer" disabled={isSending}>
            {isSending ? <Spinner text="Submitting..." /> : "Register"}
          </Button>
        </form>
        <span className="my-3 text-sm text-right text-gray-500 self-end">
          Already have an account?
          <Link href="/login" className="bold text-red-500 italic">
            {" "}
            Click here{" "}
          </Link>{" "}
          to Sign in.
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;
