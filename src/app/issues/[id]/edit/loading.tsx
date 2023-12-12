import { Skeleton } from "../../../components";

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
