"use client";
import { Skeleton, Spinner } from "@/_components";
import { Devs } from "@prisma/client";
import { Heading, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  // const [devs, setDevs] = useState<Devs[]>([]);

  // useEffect(() => {
  //   const getDevs = async () => {
  //     const res = await fetch("/api/devs");
  //     if (!res.ok) return null;

  //     const devlist = await res.json();
  //     return setDevs(devlist);
  //   };

  //   getDevs();
  // }, []);

  const {
    data: devs,
    error,
    isLoading,
  } = useQuery<Devs[]>({
    queryKey: ["assignees"],
    queryFn: () =>
      fetch("/api/devs")
        .then((res) => res.json())
        .catch((e) => console.log(e)),
    retry: 3,
    staleTime: 60 * 1000, //list of entries will be cached for 60s i.e. 1mins
  });

  if (isLoading) return <Skeleton />;

  if (error) return <Heading as="h6">Unable to load devs</Heading>;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {devs?.map((dev) => (
            <Select.Item key={dev.id} value={dev.id}>
              {dev.userName}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
