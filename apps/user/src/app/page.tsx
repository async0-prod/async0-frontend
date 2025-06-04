import { Navbar } from "@/app/_components/Navbar";

import HeroIllustration from "./_components/HeroIllustration";
import HeroSection from "./_components/HeroSection";

export default async function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-col lg:flex-row flex-1 items-center justify-center">
        <HeroSection />
        <HeroIllustration />
      </main>
    </div>
  );
}
