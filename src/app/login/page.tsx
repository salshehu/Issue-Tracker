"use client";
import { Button, Text } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const router = useRouter();

  const loginHandler = async () => {
    console.log(credentials);

    try {
      const { email, password } = credentials;
      await signIn("Credentials", { email, password });
      router.push("/auth/callback");
      console.log("login went through");
    } catch (error) {
      alert("Authentication failed");
      router.push("/auth/error?action");
      return;
    }
  };

  return (
    <div className=" place-items-center h-screen grid ">
      <div className="flex flex-col p-3 w-[25rem] rounded-md border-2 border-t-4 border-violet-300 shadow-sm">
        <Text className="font-semibold text-center my-4">
          Kindly enter your login credentials
        </Text>
        <form onSubmit={loginHandler} className=" flex flex-col p-3 gap-3 ">
          <input
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            value={credentials.email}
            required
            name="email"
            placeholder="Email"
            type="email"
            className=" p-2 border"
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
            className="p-2 border"
          />
          <Button className="m-3 cursor-pointer">Login</Button>
        </form>
        {error && <p className="text-red-400">Something went wrong: {error}</p>}

        <hr />
        <div className="flex flex-col p-3 max-w-xl">
          <p>OR </p>
          <Button
            className="inline-block mb-2 text-center cursor-pointer"
            onClick={() => signIn("google")}
          >
            Sign in with Google
          </Button>
          <Button
            className="inline-block mb-2 text-center cursor-pointer"
            onClick={() => signIn("github")}
          >
            Sign in with GitHub
          </Button>
          <Button
            className="inline-block mb-2 text-center cursor-pointer"
            onClick={() => signIn("facebook")}
          >
            Sign in with Facebook
          </Button>
        </div>
        <span className="my-3 text-sm text-right text-gray-500 self-end">
          Don't have an account?
          <Link href="/login/register" className="bold text-blue-800 italic">
            {" "}
            Click here{" "}
          </Link>{" "}
          to Sign up.
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
