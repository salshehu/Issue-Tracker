import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Manage debugging made easier",
};

export default function Home() {
  return (
    <>
      <div className="h-screen grid">
        <h1>Welcome to Bug Tracker App</h1>
        <div>Landing page</div>
      </div>
    </>
  );
}
