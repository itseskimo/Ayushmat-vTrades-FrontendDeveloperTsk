import { OtpForm } from "@/components/OtpForm";
import { AuthPageShell } from "@/components/AuthPageShell";

export default function VerifyOtpPage() {
  return (
    <AuthPageShell>
      <OtpForm />
    </AuthPageShell>
  );
}