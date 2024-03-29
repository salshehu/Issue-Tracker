"use client";
import { Developers } from "@prisma/client";
import { Flex, Tabs, Box, Text, Button, Link } from "@radix-ui/themes";
import React from "react";
import { Assignments } from "./Assignments";
import { BsPen } from "react-icons/bs";
import DeleteDevBtn from "./DeleteDevBtn";

interface Prop {
  dev: Developers;
}

const Devtabs = ({ dev }: Prop) => {
  return (
    <Flex direction={"column"} gap={"4"}>
      <Tabs.Root defaultValue="profile">
        <Tabs.List size={"2"}>
          <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
          <Tabs.Trigger value="assignment">Assignment</Tabs.Trigger>
        </Tabs.List>
        <Box>
          <Tabs.Content value="profile">
            <Profile dev={dev} />
          </Tabs.Content>
          <Tabs.Content value="assignment">
            <Assignments dev={dev} />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Flex>
  );
};

const Profile = ({ dev }: Prop) => {
  console.log(dev.Id);

  return (
    <div className="border ">
      <Flex gap={"7"}>
        <Flex direction={"column"}>
          <div className="block md:flex gap-2 m-2 p-2 items-center text-xl">
            <label className=" font-bold">ID:</label>
            <Text as="p" className=" text-slate-500 font-medium ">
              {dev.Id}
            </Text>
          </div>
          <div className="block md:flex gap-2 m-2 p-2 items-center text-xl">
            <label className=" font-bold">User_Name:</label>
            <Text as="p" className=" text-slate-500 font-medium ">
              {dev.userName}
            </Text>
          </div>
          <div className="block md:flex gap-2 m-2 p-2 items-center text-xl">
            <label className=" font-bold">First Name:</label>
            <Text as="p" className=" text-slate-500 font-medium ">
              {dev.firstName}
            </Text>
          </div>
          <div className="block md:flex gap-2 m-2 p-2 items-center text-xl">
            <label className=" font-bold">Last Name:</label>
            <Text as="p" className=" text-slate-500 font-medium">
              {dev.lastName}
            </Text>
          </div>
        </Flex>
        <Flex direction={"column"}>
          <div className="block md:flex gap-2 m-2 p-2 items-center text-xl">
            <label className=" font-bold">Contact Email:</label>
            <Text as="p" className=" text-slate-500 font-medium ">
              {dev.email}
            </Text>
          </div>
          <div className="block md:flex gap-2 m-2 p-2 items-center text-xl">
            <label className=" font-bold">Address:</label>
            <Text as="p" className=" text-slate-500 font-medium">
              {dev.address}
            </Text>
          </div>
          <div className="block md:flex gap-2 m-2 p-2 items-center text-xl">
            <label className=" font-bold">Contract:</label>
            <Text as="p" className=" text-slate-500 font-medium">
              {dev.contract}
            </Text>
          </div>
        </Flex>
      </Flex>
      <span className=" flex gap-3 m-3 align-middle">
        <Button>
          <Link
            href={"/dlopers/new/" + dev.Id}
            className="flex items-center gap-1 text-white"
          >
            <BsPen /> Update
          </Link>
        </Button>
        <DeleteDevBtn id={dev.Id} />
      </span>
    </div>
  );
};
export default Devtabs;
