import { Navbar } from "@/components/Navbar";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="relative flex min-h-screen flex-col w-full">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 px-4 py-12 md:py-0">
          <div className="flex flex-col justify-center space-y-6 ">
            <h1 className="text-6xl font-black font-nunito leading-13">
              Solve Problems
              <span className="block">in Javascript</span>
            </h1>
            <p className="font-nunito text-muted-foreground max-w-[80%]">
              JavaScript? Is it the best tool for the job? Absolutely not. Will
              we do it anyway? You bet your undefined we will.
            </p>
          </div>
          <div className="flex items-center justify-center relative">
            <div>
              <div className="dark:hidden">
                <Image
                  src="/JobStressBlack.svg"
                  alt="JavaScript developer in pain"
                  width={500}
                  height={400}
                  className="mx-auto"
                  priority
                />
              </div>
              <div className="hidden dark:block">
                <Image
                  src="/JobStressWhite.svg"
                  alt="JavaScript developer in pain"
                  width={500}
                  height={400}
                  className="mx-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
