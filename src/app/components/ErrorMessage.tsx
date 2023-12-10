import React, { PropsWithChildren } from "react";
import { Callout, Text } from "@radix-ui/themes";
import { AiFillWarning } from "react-icons/ai";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <p>
      <Callout.Root color="red">
        <Callout.Icon>
          <AiFillWarning />
        </Callout.Icon>
        <Callout.Text>{children}</Callout.Text>
      </Callout.Root>
    </p>
  );
};

export default ErrorMessage;
