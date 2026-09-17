import Image from "next/image";

/** Shared visual shell imported explicitly by each auth page. */
export function AuthPageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="auth-shell">
      <section className="hero" aria-label="About WorkHive">
        <Image
          className="hero-image"
          src="/workhive-team.jpg"
          alt="A team collaborating around a table"
          fill
          priority
          sizes="(max-width: 950px) 100vw, 50vw"
        />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <h1>Welcome to WORKHIVE!</h1>
          <ul>
            <li>
              Employee Management: View detailed profiles, track performance,
              and manage attendance.
            </li>
            <li>
              Performance Insights: Analyze team goals, progress, and
              achievements.
            </li>
            <li>
              Attendance &amp; Leaves: Track attendance patterns and manage
              leave requests effortlessly.
            </li>
          </ul>
        </div>
      </section>
      <section className="form-area">{children}</section>
    </main>
  );
}
