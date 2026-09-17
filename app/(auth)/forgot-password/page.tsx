import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { AuthPageShell } from "@/components/AuthPageShell";

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell>
      <ForgotPasswordForm />
    </AuthPageShell>
  );
}