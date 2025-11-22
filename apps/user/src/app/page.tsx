import { Navbar } from "@/app/_components/navbar";
import HeroIllustration from "./_components/hero-illustration";
import HeroSection from "./_components/hero-section";

export default async function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-10 md:px-8 lg:flex-row lg:py-0">
        <HeroSection />
        <HeroIllustration />
      </main>
    </div>
  );
}
