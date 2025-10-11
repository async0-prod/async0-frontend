import { Navbar } from "@/app/_components/navbar";
import HeroIllustration from "./_components/hero-illustration";
import HeroSection from "./_components/hero-section";

export default async function Home() {
  return (
    <div className="relative flex h-screen flex-col p-2">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center lg:flex-row">
        <HeroSection />
        <HeroIllustration />
      </main>
    </div>
  );
}
