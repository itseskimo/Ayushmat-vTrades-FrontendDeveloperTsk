import { SignInForm } from "@/components/SignInForm";
import { AuthPageShell } from "@/components/AuthPageShell";

export default function SignInPage() {
  return (
    <AuthPageShell>
      <SignInForm />
    </AuthPageShell>
  );
}