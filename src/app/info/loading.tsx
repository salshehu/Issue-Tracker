import { Container, Heading } from "@radix-ui/themes";

import Skeleton from "react-loading-skeleton";

const loading = () => {
  return (
    <div>
      <Container>
        <div className="h-screen  grid p-3">
          <Skeleton />
          <div className="grid md:grid-cols-2 p-5 space-y-10">
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default loading;
