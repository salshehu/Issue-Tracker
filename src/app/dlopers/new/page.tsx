import React from "react";
import DevForm from "../_components/DevForm";
import { Heading, Container } from "@radix-ui/themes";

const newDevPage = () => {
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
