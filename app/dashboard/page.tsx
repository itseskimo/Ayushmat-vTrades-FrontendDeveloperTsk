import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { SignOutButton } from "@/components/SignOutButton";

export default async function DashboardPage() {
  // Retrieves the authenticated user's server-side session.
  const session = await auth();

  // Redirects unauthenticated users to the sign-in page.
  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="grid min-h-screen place-items-center p-6">
      {/* Dashboard welcome card */}
      <section className="w-full max-w-lg rounded-2xl border border-stroke bg-surface p-10 text-center">
        <h1 className="mb-3 text-3xl font-semibold">
          Welcome to WorkHive
        </h1>

        {/* Displays the user's email, or their name as a fallback */}
        <p className="mb-8 text-[#dadada]">
          Signed in as{" "}
          {session.user?.email ??
            session.user?.name ??
            "WorkHive user"}
        </p>

        <SignOutButton />
      </section>
    </main>
  );
}