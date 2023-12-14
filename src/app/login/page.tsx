"use client";
import { Button } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div>
      Login page or register at{" "}
      <div>
        login with <Button onClick={() => signIn()}>Google</Button>
      </div>
      <div>
        login with <Button onClick={() => signIn()}>GitHub</Button>
      </div>
      <div>
        login with <Button onClick={() => signIn()}>Apple</Button>
      </div>
      <p>
        <Link href="/login/register">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
