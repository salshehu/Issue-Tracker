import Image from "next/image";
import imgPic from "@/../../public/catheringe.webp";
import { Container, Heading } from "@radix-ui/themes";

const AboutPage = () => {
  return (
    <Container>
      <div className="h-screen  grid p-3">
        <Heading as="h4"> About Symbiotic Bug Tracker</Heading>
        <div className="grid md:grid-cols-2 p-5 space-y-10">
          <Image src={imgPic} height={400} alt="painting" />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo atque
            error aliquam perspiciatis quaerat, hic ducimus ea voluptatibus
            commodi. Magnam eum laudantium beatae magni maiores ipsum
            consequuntur, dignissimos ab exercitationem?
          </p>
        </div>
      </div>
    </Container>
  );
};

export default AboutPage;
