// import { SignInForm } from "./_components/SignInForm";
import Link from "next/link";

export default async function SignInPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex h-10 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className={`flex items-center text-3xl font-black`}>
              async0
            </Link>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{/* <SignInForm /> */}</div>
        </div>
        <div className="text-muted-foreground text-center text-sm">
          <p>
            Need help?{" "}
            <Link
              href="https://github.com/grvbrk"
              target="_blank"
              className="hover:text-primary underline underline-offset-2"
            >
              Contact me
            </Link>
          </p>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        {/* TODO: Image goes here */}
      </div>
    </div>
  );
}
