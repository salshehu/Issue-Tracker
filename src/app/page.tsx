import { Text, Heading, Button, Container, Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import Image from "next/image";
import hero from "../../public/hero.jpg";
import errorImg from "../../public/img_error.webp";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Manage debugging made easier",
};

export default function Home() {
  return (
    <div className=" flex flex-col align-middle items-center px-3 gap-5 m-1">
      <Heading color="violet" className="mb-10">
        <span className="text-3xl text-gray-500">Symbiotic</span> Bug Tracker
        App
      </Heading>

      <div className="grid md:grid-cols-2 mx-auto content-center gap-10">
        <div className=" flex-col ">
          <Heading className="my-9 text-2xl">
            Track Bugs With Lots More Precision, Assign with Much More Ease
          </Heading>
          <h4 className="my-7 justify-evenly text-xl font-thin">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            dignissimos enim quas possimus ad alias natus assumenda at, sapiente
            fuga dolore expedita explicabo culpa debitis accusamus? Iste
            nesciunt qui nam!
          </h4>
          <Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
            necessitatibus iure dolore? Eveniet eligendi iusto inventore aliquam
            commodi! Doloremque soluta quis aut magnam eius natus quia illum,
            cum similique saepe aliquam itaque explicabo rem architecto tempora
            repudiandae tempore non debitis deserunt officiis cumque maxime
            dolore. Amet explicabo reprehenderit sed corrupti!
          </Text>
          <Flex
            align={"baseline"}
            justify={"end"}
            className="my-10 block gap-3 "
          >
            <Button className="">
              <Link href={"/login"}>Sign in</Link>{" "}
            </Button>
            <Text className="mx-2">
              for a treat of a lifetime and explore our world of possibilities.
            </Text>
          </Flex>
        </div>
        <div className=" flex-1">
          <Image
            alt="heroImage"
            width={700}
            height={800}
            src={hero}
            quality={75}
          />
        </div>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
          deserunt expedita aut nobis eos dicta saepe, animi, quae cumque ea
          tempora consequuntur ab ullam illum fugit voluptatum, quaerat
          aspernatur illo!
        </div>
        <div></div>
        <div className="flex items-center justify-center">
          <Image src={errorImg} width={200} height={50} alt="erro" />
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem quia
          atque accusantium, velit, enim, magnam commodi eaque cumque ut
          laudantium quis itaque quam odit a corporis. Necessitatibus quaerat
          cum quo?
        </div>
      </div>
    </div>
  );
}
