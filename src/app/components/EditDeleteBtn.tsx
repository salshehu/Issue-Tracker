import { Button } from "@radix-ui/themes";
import React, { ReactNode } from "react";
import { BsPencil } from "react-icons/bs";
import { LinkComp } from ".";

interface Props {
  href: string;
  size?: "1" | "2" | "3" | "4";
  color?: "violet" | "red" | "green";
  icon: ReactNode;
  text: string;
}

const EditDeleteBtn = ({
  href,
  size = "2",
  color = "violet",
  icon,
  text,
}: Props) => {
  const iconComp = icon || <BsPencil />;

  return (
    <LinkComp href={href}>
      <Button size={size} color={color}>
        {iconComp}
        {text}
      </Button>
    </LinkComp>
  );
};

export default EditDeleteBtn;
