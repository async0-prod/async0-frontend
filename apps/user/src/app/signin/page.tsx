import { SignInForm } from "./_components/SignInForm";
import Link from "next/link";

export default async function SignInPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex h-10 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className={`flex items-center font-black text-3xl`}>
              async0
            </Link>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignInForm />
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Need help?{" "}
            <Link
              href="https://github.com/grvbrk"
              target="_blank"
              className="underline underline-offset-2 hover:text-primary"
            >
              Contact me
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        {/* TODO: Image goes here */}
      </div>
    </div>
  );
}
