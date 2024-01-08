"use client";
import { Spinner } from "@/_components";
import { Developers } from "@prisma/client";
import { Heading, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ id }: { id: number }) => {
  const { data: devs, error, isLoading } = useFetchDev();

  if (isLoading) return <Spinner text="Loading..." />;

  if (error) return <Heading as="h6">Unable to load devs</Heading>;

  return (
    <>
      <Select.Root>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item key="" value="unassigned">
              Unassigned
            </Select.Item>
            {devs?.map((dev, index) => (
              <Select.Item key={index} value={dev.Id}>
                {dev.userName}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useFetchDev = () =>
  useQuery<Developers[]>({
    queryKey: ["assignees"],
    queryFn: async () =>
      await fetch("/api/devs")
        .then((res) => res.json())
        .catch((e) => console.log(e)),
    retry: 3,
    staleTime: 60 * 1000, //list of entries will be cached for 60s i.e. 1mins
  });

export default AssigneeSelect;

// onValueChange={async (dev) => {
//   console.log(dev);

//   try {
//     const res = await fetch(`/api/issues/${id ? id : null}`, {
//       method: "PATCH",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(dev),
//
//     });
//     console.log(res);

//     if (!res.ok) return new Error("unable to assign developer");
//     toast.success("assignment was successfull");
//     useRouter().push("/issues/lists");
//     return;
//   } catch (error) {
//     toast.error("Assignment failed, try again");
//   }
// }}

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
