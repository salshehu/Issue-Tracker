import React from "react";
import DevForm from "../_components/DevForm";
import { Heading, Container } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/authOptions";
import { redirect } from "next/navigation";

const newDevPage = async () => {
  // validate session
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className=" flex flex-col items-center justify-center gap-10">
      <Heading className="text-violet-700">
        Developer's Personal Details
      </Heading>

      <DevForm />
    </div>
  );
};

export default newDevPage;
