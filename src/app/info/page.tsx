import Image from "next/image";
import imgPic from "@/../../public/catheringe.webp";
import { Container, Heading } from "@radix-ui/themes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Symbiotic",
  description: "A concise description of Symbiotic Inc.",
};

const AboutPage = () => {
  return (
    <Container>
      <div className="  grid p-3">
        <Heading as="h4"> About Symbiotic Bug Tracker</Heading>
        <p className="my-5">
          This web application is a demonstration app. It is a Fullstack app
          developed with the latest stacks in web application development. It is
          prepared with NextJs 13, spiced with Tailwind CSS and garnished with
          Radix-UI Themes while backing it up on Postgres EnterpriseDB before
          serving on Netlify.
        </p>
        <div className="grid md:grid-cols-2 p-5 space-y-10">
          <Image src={imgPic} height={400} alt="painting" />

          <p>
            Libraries that have been used in the project are namely: --
            hookform/resolvers <br />
            -- next-auth/prisma-adapter <br />
            -- prisma/client <br />
            --radix-ui/themes <br />
            --react-icons/all-files <br />
            -- tanstack/react-query <br />
            -- bcrypt <br />
            -- easymde <br />
            -- next <br />
            -- next-auth <br />
            -- next-cloudinary
            <br />
            -- react <br />
            -- react-dom <br />
            -- react-hook-form <br />
            -- react-hot-toast <br />
            -- react-icons
            <br />
            -- react-loading-skeleton <br />
            -- react-markdown <br />
            -- react-simplemde-editor
            <br />
            -- recharts <br />
            -- sharp <br />
            -- use-debounce <br />
            -- zod
            <br />
            -- tailwindcss/typography
            <br />
            -- types/bcrypt <br />
            -- types/node
            <br />
            -- types/react
            <br />
            -- types/react-dom <br />
            -- prisma <br />
            -- tailwindcss <br />
            -- ts-node
            <br />
            -- typescript
          </p>
        </div>
      </div>
    </Container>
  );
};

export default AboutPage;
