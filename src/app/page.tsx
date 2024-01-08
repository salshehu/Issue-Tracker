import {
  Text,
  Heading,
  Button,
  Container,
  Flex,
  Quote,
} from "@radix-ui/themes";
import { Metadata } from "next";
import Image from "next/image";
import hero from "../../public/hero.jpg";
import imgP from "../../public/img_error.webp";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Manage debugging made easier",
};

export default function Home() {
  return (
    <div className=" flex flex-col align-middle items-center px-3 gap-3 m-1">
      <Heading color="violet" className="mb-10">
        <span className="text-3xl text-gray-500">Symbiotic</span> Bug Tracker
        App
      </Heading>

      <div className="grid md:grid-cols-2 mx-auto content-center gap-5">
        <div className=" flex-col ">
          <Heading className="my-5 text-2xl">
            Track Bugs With Lots More Precision, Assign with Much More Ease
          </Heading>
          <h4 className="my-3 justify-evenly text-xl font-thin">
            Next.js is a React framework for building full-stack web
            applications. You use React Components to build user interfaces, and
            Next.js for additional features and optimizations. Under the hood,
            Next.js also abstracts and automatically configures tooling needed
            for React, like bundling, compiling, and more. This allows you to
            focus on building your application instead of spending time with
            configuration. Whether you&apos;re an individual developer or part
            of a larger team, Next.js can help you build interactive, dynamic,
            and fast React applications.
          </h4>
          <Text>
            Prisma is an open source next-generation ORM <br /> Prisma Client is
            an auto-generated, type-safe query builder generated based on the
            models and attributes of your Prisma schema. It facilitates how to
            perform CRUD operations with your generated Prisma Client API. CRUD
            is an acronym that stands for: Create; Read; Update; Delete.Prisma
            ORM is a a Node.js and TypeScript ORM with an intuitive data model,
            automated migrations, type-safety, and auto-completion.
            <Link href="https://www.prisma.io">Learn</Link> about the concepts
            for building your data model with Prisma: Models, scalar types,
            enums, attributes, functions, IDs, default values and more...
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
          TypeScript is JavaScript with added syntax for types. What is
          TypeScript? TypeScript is a syntactic superset of JavaScript which
          adds static typing. It is a free and open-source high-level
          programming language developed by Microsoft that adds static typing
          with optional type annotations to JavaScript. It is designed for the
          development of large applications and transpiles to JavaScript. <hr />
          TypeScript adds additional syntax to JavaScript to support a tighter
          integration with your editor. Catch errors early in your editor.
        </div>
        <div>
          <Text>
            Tailwind CSS is a utility-first CSS framework for rapidly building
            modern websites without ever leaving your HTML. Tailwind CSS is
            developed using JavaScript, runs via Node.js, and installs with
            environment package managers like npm or yarn. Tailwind CSS makes it
            quicker to write and maintain the code of your application. By using
            this utility-first framework, you don't have to write separate css
            files.
          </Text>
        </div>
        <div className="flex items-center justify-center">
          <Image src={imgP} height={300} width={300} alt="error" />
        </div>
        <div>
          <Quote className="my-5 block">
            We have never lost track of any reported issue since we migrated to
            Symbiotic Bug Tracker
          </Quote>
          <small> -- Ravish Kandar</small>
          <Heading as={"h5"} my={"2"}>
            NextAuth Authentication
          </Heading>
          NextAuth.js is a complete open-source authentication solution for
          Next.js applications.It is designed from the ground up to support
          Next.js and Serverless.
          <Text as={"p"} className="font-medium text-xl my-5">
            Flexible and easy to use
          </Text>
          <ul>
            <li>
              Designed to work with any OAuth service, it supports OAuth 1.0,
              1.0A, 2.0 and OpenID Connect
            </li>
            <li>Built-in support for many popular sign-in services</li>
            <li>Supports email / passwordless authentication</li>
            <li>
              Supports stateless authentication with any backend (Active
              Directory, LDAP, etc)
            </li>
            <li>Supports both JSON Web Tokens and database sessions</li>
            <li>
              Designed for Serverless but runs anywhere (AWS Lambda, Docker,
              Heroku, etc…)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
