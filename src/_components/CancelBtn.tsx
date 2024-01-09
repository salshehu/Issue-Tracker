import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useReducer } from "react";

const CancelBtn = () => {
  const route = useRouter();
  return <Button onClick={() => route.back()}>Cancel</Button>;
};

export default CancelBtn;
