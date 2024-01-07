"use client";
import { Spinner } from "@/_components";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { RegisterFormSchema } from "@/_lib/schemaValidation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type formSchema = z.infer<typeof RegisterFormSchema>;

const RegisterPage = () => {
  const [isSending, setIsSending] = useState(false);
  const [pwStrenght, setPwStrenght] = useState({ msg: "", col: "" });
  const [passMatch, setPassMatch] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchema>({ resolver: zodResolver(RegisterFormSchema) });
  const router = useRouter();

  // validate session
  const { data: session } = useSession();
  if (session) redirect("/dashboard");

  const onSubmit = async (data: FieldValues) => {
    if (data.password1 !== data.password2) {
      setPassMatch("Passwords do not match, check again");
      return;
    }
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
      router.replace("/login?registration=success");
      console.log(data);
      console.log(res.json);
    } catch (err) {
      setIsSending(false);
      return new Error();
    }
  };

  const checkPwStrength = (e: FieldValues) => {
    // prevent spaces from being included in password
    if (e.charCode == 32) e.preventDefault();

    // set up variables
    const strength = ["Weak", "Average", "Strong"];
    const colStyle = ["text-red-600", "text-yellow-600", "text-green-600"];
    let pass: string = e.target.value;

    // count uppercase letters
    let uc = pass.match(/[A-Z]/g);
    let uc_count = (uc && uc.length) || 0;

    // count numbers
    let nm = pass.match(/\d/g);
    let nm_count = (nm && nm.length) || 0;

    // count symbols
    let nw = pass.match(/\W/g);
    let nw_count = (nw && nw.length) || 0;

    // determine password strenght
    let s = pass.length + uc_count + nm_count * 2 + nw_count * 3;

    s = Math.min(Math.floor(s / 10), 2);

    if (pass.length) {
      setPwStrenght({ ...pwStrenght, msg: strength[s], col: colStyle[s] });
    } else {
      setPwStrenght({ ...pwStrenght, msg: "", col: "" });
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
              onChange={(e) => checkPwStrength(e)}
            />
            {pwStrenght && (
              <span className={`text-medium ${pwStrenght.col}`}>
                {pwStrenght.msg}
              </span>
            )}
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
            />{" "}
            {passMatch && <span className="text-red-600">{passMatch}</span>}
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
          <Link href="/login" className="bold text-red-800 italic">
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
