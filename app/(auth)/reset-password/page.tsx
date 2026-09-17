import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { AuthPageShell } from "@/components/AuthPageShell";

export default function ResetPasswordPage() {
  return (
    <AuthPageShell>
      <ResetPasswordForm />
    </AuthPageShell>
  );
}