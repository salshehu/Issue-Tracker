import { Flex, Heading } from "@radix-ui/themes";
import { Metadata } from "next";
import Image from "next/image";
import hero from "../../public/hero.jpg";

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Manage debugging made easier",
};

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center">
      <Heading color="violet">Welcome to Bug Tracker App</Heading>

      <Flex direction={"column"} className=" gap-[50em]">
        <div className=" flex-1">Landing page</div>
        <div className=" flex-1">
          Images...
          <Image alt="heroImage" width={500} src={hero} quality={75} />
        </div>
      </Flex>
    </div>
  );
}
