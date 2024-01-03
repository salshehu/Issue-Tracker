import prisma from "../../../../prisma/client";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import no_avatar from "../../../../public/no_avatar.png";
import { BsFacebook, BsPerson, BsTwitterX } from "react-icons/bs";
import Devtabs from "./Devtabs";

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
      {dev ? (
        <div>
          <Flex justify={"between"}>
            <Box className="flex-col items-start m-4">
              <Image
                src={dev?.profilePic || no_avatar}
                // className="inline-block object-fill w-auto h-auto "
                width={200}
                height={350}
                alt="developer image"
                placeholder="blur"
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
          </Flex>
          <Devtabs dev={dev} />
        </div>
      ) : (
        <Text>
          Couldn't load developer's detail, something must have gone wrong
          somewhere along the line.
        </Text>
      )}
    </div>
  );
};

export default page;
