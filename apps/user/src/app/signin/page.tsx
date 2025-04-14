import { AuthIllustration } from "@/components/AuthIllustration";
import { SignInForm } from "@/components/SignInForm";

export default async function SignInPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 lg:p-8 xl:p-12">
        <div className="w-full max-w-md">
          <SignInForm />
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-muted/30">
        <AuthIllustration />
      </div>
    </div>
  );
}
