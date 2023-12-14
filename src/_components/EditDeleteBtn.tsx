import { Button } from "@radix-ui/themes";
import React, { ReactNode } from "react";
import { BsPencil } from "react-icons/bs";

interface Props {
  // size?: "1" | "2" | "3" | "4";
  color?: "violet" | "red" | "green";
  icon: ReactNode;
  text: string;

  clickHandler?: () => void;
}

const EditDeleteBtn = ({
  // size = "2",
  color = "violet",
  icon,
  text,

  clickHandler,
}: Props) => {
  const iconComp = icon || <BsPencil />;

  return (
    <Button color={color} onClick={clickHandler}>
      {iconComp}
      {text}
    </Button>
  );
};

export default EditDeleteBtn;
