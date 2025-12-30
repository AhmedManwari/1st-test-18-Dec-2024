import Link from "next/link";

const modules = [
  {
    title: "Purchasing",
    description: "Monitor purchase requests, approvals, and receipts.",
    href: "/purchasing",
    stats: [
      { label: "Pending approvals", value: "8" },
      { label: "Orders in flight", value: "14" },
    ],
  },
  {
    title: "Stores",
    description: "Track inventory, movements, and stock coverage.",
    href: "/stores",
    stats: [
      { label: "Low stock alerts", value: "5" },
      { label: "Open movements", value: "12" },
    ],
  },
  {
    title: "Fleet",
    description: "Review vehicle assignments and inspection status.",
    href: "/fleet",
    stats: [
      { label: "Active assignments", value: "9" },
      { label: "Inspections due", value: "3" },
    ],
  },
  {
    title: "HR",
    description: "Oversee leave requests and attendance trends.",
    href: "/hr",
    stats: [
      { label: "Leave awaiting review", value: "6" },
      { label: "Today check-ins", value: "28" },
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Line manager overview
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Operations dashboards
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Access each module dashboard to review status, approvals, and
            operational activity across your teams.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {modules.map((module) => (
            <Link
              key={module.title}
              href={module.href}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {module.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {module.description}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                  View dashboard
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {module.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
