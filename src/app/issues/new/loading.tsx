import { TextField } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingNewIssueSkel = () => {
  return (
    <div>
      <form className="p-5 space-y-3">
        <div>
          <Skeleton />
        </div>

        <div>
          <Skeleton />
        </div>

        <div className=" w-3">
          <Skeleton />
        </div>
      </form>
    </div>
  );
};

export default LoadingNewIssueSkel;
