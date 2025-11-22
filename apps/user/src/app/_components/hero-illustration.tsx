import Image from "next/image";

export default function HeroIllustration() {
  return (
    <div className="relative flex w-full flex-1 items-center justify-center p-4 lg:p-8">
      {/* <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      /> */}

      <div className="relative z-10 mx-auto flex items-center justify-center">
        <div className="dark:hidden">
          <Image
            src="/JobStressBlack.svg"
            alt="JavaScript developer in pain"
            width={550}
            height={550}
            priority
          />
        </div>
        <div className="hidden dark:block">
          <Image
            src="/JobStressWhite.svg"
            alt="JavaScript developer in pain"
            width={550}
            height={550}
            priority
          />
        </div>
      </div>
    </div>
  );
}
