import React from "react";
import prisma from "../../../../prisma/client";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  TableBody,
  TableCell,
  TableRow,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import { BsFacebook, BsPerson, BsTwitterX } from "react-icons/bs";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const dev = await prisma.developers.findUnique({
    where: { Id: params.id },
  });

  return (
    <div>
      <Heading>{dev?.lastName} Personal Info</Heading>
      <div>
        <Flex justify={"between"}>
          <Box className="flex-col items-start m-4">
            <Avatar
              src={dev?.profilePic || "./no_avatar.png"}
              fallback={<BsPerson size={"93"} />}
              size="9"
              radius="medium"
              className="inline-block "
            />
            <span className="block m-2 pl-1 text-lg font-bold text-green-900 ">
              Full Stack Developer
            </span>
          </Box>
          <Flex mt={"6"} align={"end"} direction={"column"}>
            <Flex gap={"2"} align={"center"}>
              <BsFacebook />
              {dev?.userName}
            </Flex>
            <Flex gap={"2"} align={"center"}>
              <BsTwitterX />
              {dev?.userName}
            </Flex>
          </Flex>
        </Flex>
        <div></div>
      </div>
    </div>
  );
};

export default page;
