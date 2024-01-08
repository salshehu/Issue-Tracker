"use client";
import { Button, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  // validate session
  const { status } = useSession();
  if (status === "authenticated") redirect("/dashboard");

  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const router = useRouter();

  const loginHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log(credentials);

    try {
      const { email, password } = credentials;
      const signing = await signIn("credentials", { email, password });

      if (!signing) throw new Error();

      toast.success("Login was successfull", { position: "bottom-right" });
      router.push("/dashboard");

      console.log("login went through");
    } catch (error) {
      toast.error("An error occurred while logging in", {
        position: "top-right",
      });
      console.log(error);
    }
  };

  return (
    <div className=" place-items-center h-screen grid ">
      <div className="flex flex-col p-3 w-[25rem] rounded-md border-2 border-t-4 border-violet-300 shadow-sm">
        <Text className="font-semibold text-center my-4">
          Kindly enter your login credentials
        </Text>
        <form
          onSubmit={loginHandler}
          className=" flex flex-col items-center p-3 gap-3 "
        >
          <input
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            value={credentials.email}
            required
            name="email"
            placeholder="Email"
            type="email"
            className=" p-2 border w-full"
          />
          <input
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            value={credentials.password}
            required
            name="password"
            placeholder="Password"
            type="password"
            className="p-2 border w-full"
          />
          <Button className="m-3 cursor-pointer w-48">Login</Button>
        </form>
        {error && <p className="text-red-400">Something went wrong: {error}</p>}

        <hr />
        <div className="flex flex-col p-3 max-w-xl items-center">
          <p>OR </p>
          <Button
            className="inline-block my-3 text-center cursor-pointer w-48"
            onClick={() => signIn("google")}
          >
            Sign in with Google
          </Button>
        </div>
        <span className="my-3 text-sm text-right text-gray-500 self-end">
          Don&apos;t have an account?
          <Link href="/register" className="bold text-red-800 italic">
            {" "}
            Click here to Register.
          </Link>{" "}
        </span>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginPage;

//  <Button
//           className="inline-block mb-2 text-center cursor-pointer"
//           onClick={() => signIn("github")}
//         >
//           Sign in with GitHub
//         </Button>
//         <Button
//           className="inline-block mb-2 text-center cursor-pointer"
//           onClick={() => signIn("facebook")}
//         >
//           Sign in with Facebook
//         </Button>
