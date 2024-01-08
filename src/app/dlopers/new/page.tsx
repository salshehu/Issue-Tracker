import { authOptions } from "@/_lib/authOptions";
import { Heading } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DevForm from "../_components/DevForm";

const newDevPage = async () => {
  // validate session
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className=" flex flex-col items-center justify-center gap-10">
      <Heading className="text-violet-700">
        Developer&apos;s Personal Details
      </Heading>

      <DevForm />
    </div>
  );
};

export const metadata: Metadata = {
  title: "New Developer",
  description: "Fill in details of new developer",
};

export default newDevPage;
