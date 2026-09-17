import { SignUpForm } from "@/components/SignUpForm";
import { AuthPageShell } from "@/components/AuthPageShell";

export default function SignUpPage() {
  return (
    <AuthPageShell>
      <SignUpForm />
    </AuthPageShell>
  );
}