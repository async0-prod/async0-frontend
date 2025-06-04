import Image from "next/image";

export default function HeroIllustration() {
  return (
    <div className="flex flex-1 items-center justify-center px-8 pb-8">
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
  );
}
