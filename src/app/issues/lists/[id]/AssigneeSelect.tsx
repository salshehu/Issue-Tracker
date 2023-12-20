"use client";
import { Devs } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [devs, setDevs] = useState<Devs[]>([]);

  useEffect(() => {
    const getDevs = async () => {
      const res = await fetch("/api/devs");
      if (!res.ok) return null;

      const devlist = await res.json();
      return setDevs(devlist);
    };

    getDevs();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {devs.map((dev) => (
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
