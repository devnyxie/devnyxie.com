import Link from "next/link";
import Container from "@/app/components/layout/container";
import Heading from "@/app/components/heading";
import { Button } from "@/app/components/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <Container>
      <div className="text-center flex flex-col items-center space-y-6">
        <Image src="/404/steins.gif" className="w-20" width={160} height={160} alt="random gif"/>
        <div>
          <Heading size="big" className="mb-4">
            404 - Page Not Found
          </Heading>
          <p className="text-muted-foreground text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="flex gap-2 justify-center">
          <Button variant="default" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
