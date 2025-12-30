const summaryCards = [
  { label: "Leave requests", value: "16", helper: "5 awaiting approval" },
  { label: "Team availability", value: "92%", helper: "3 on leave today" },
  { label: "Attendance alerts", value: "4", helper: "2 absences, 2 early exits" },
];

const requests = [
  {
    employee: "Nia Robinson",
    type: "Short leave",
    dates: "Mar 18",
    status: "Supervisor + HR review",
  },
  {
    employee: "Chen Wei",
    type: "Annual leave",
    dates: "Mar 20 - Mar 22",
    status: "Multi-level approval",
  },
  {
    employee: "Sara Khan",
    type: "Early exit",
    dates: "Mar 18",
    status: "Supervisor approval",
  },
];

const attendanceAlerts = [
  {
    employee: "Luis Ortega",
    exception: "Absent from work",
    detected: "Mar 17",
    status: "Manager justification",
  },
  {
    employee: "Amira Noor",
    exception: "Early exit",
    detected: "Mar 17",
    status: "Supervisor review",
  },
];

const automationRules = [
  "Short leave requests auto-deduct hours after supervisor + HR approval.",
  "Annual leave routes through multi-level approvals with balance checks.",
  "Absences are detected from biometric logs and require manager justification.",
  "Early exit requests trigger real-time attendance notifications.",
];

export default function HrDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            HR dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            HR overview
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Review leave applications, automated attendance alerts, and
            workforce coverage.
          </p>
        </div>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase text-slate-500">
                {card.label}
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {card.value}
              </p>
              <p className="mt-2 text-sm text-slate-600">{card.helper}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Automated HR workflows
            </h2>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Automation active
            </span>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {automationRules.map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Leave applications
              </h2>
              <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
                5 awaiting review
              </span>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Employee</th>
                    <th className="px-4 py-3">Request type</th>
                    <th className="px-4 py-3">Dates</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {requests.map((row) => (
                    <tr key={row.employee} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {row.employee}
                      </td>
                      <td className="px-4 py-3">{row.type}</td>
                      <td className="px-4 py-3">{row.dates}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Attendance exceptions
              </h2>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                2 need follow-up
              </span>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Employee</th>
                    <th className="px-4 py-3">Exception</th>
                    <th className="px-4 py-3">Detected</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {attendanceAlerts.map((row) => (
                    <tr key={row.employee} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {row.employee}
                      </td>
                      <td className="px-4 py-3">{row.exception}</td>
                      <td className="px-4 py-3">{row.detected}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
