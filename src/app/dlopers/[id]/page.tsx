import prisma from "../../../../prisma/client";
import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import no_avatar from "../../../../public/no_avatar.png";
import { BsFacebook, BsPen, BsTwitterX } from "react-icons/bs";
import Devtabs from "./Devtabs";
import Link from "next/link";
import DevChart from "../_components/DevChart";
import IssueSummary from "@/app/dashboard/IssueSummary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/authOptions";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  // validate session
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const dev = await prisma.developers.findUnique({ where: { Id: params.id } });
  const open = await prisma.issue.count({
    where: { devId: params.id, status: "OPEN" },
  });
  const inProgress = await prisma.issue.count({
    where: { devId: params.id, status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({
    where: { devId: params.id, status: "CLOSED" },
  });

  return (
    <Container>
      <Heading>{dev?.lastName} Personal Info</Heading>
      {dev ? (
        <div>
          <Flex className="items-center justify-center block md:flex md:justify-between ">
            <Box className="flex-col items-start m-4">
              <Image
                src={dev?.profilePic || no_avatar}
                className="inline-block object-fill w-auto h-auto "
                width={200}
                height={350}
                alt="developer image"
              />

              <Flex mt={"2"} align={"center"} gap={"3"}>
                <Flex gap={"2"} align={"center"}>
                  <BsFacebook />
                  {dev?.userName}
                </Flex>
                <Flex gap={"2"} align={"center"}>
                  <BsTwitterX />
                  {dev?.userName}
                </Flex>
              </Flex>
            </Box>
            <Box className="flex-col md:flex items-center justify-center">
              <DevChart open={open} inProgress={inProgress} closed={closed} />
              <IssueSummary
                open={open}
                inProgress={inProgress}
                closed={closed}
              />
            </Box>
          </Flex>
          <Devtabs dev={dev} />
        </div>
      ) : (
        <Text>
          Couldn&apos;t load developer&apos;s detail, something must have gone
          wrong somewhere along the line.
        </Text>
      )}
    </Container>
  );
};

export default page;
