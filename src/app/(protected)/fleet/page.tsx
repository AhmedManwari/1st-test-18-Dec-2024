const summaryCards = [
  { label: "Fleet available", value: "22", helper: "4 in maintenance" },
  { label: "Active assignments", value: "11", helper: "2 due this week" },
  { label: "Inspections pending", value: "3", helper: "Before/after checks" },
];

const assignments = [
  {
    vehicle: "Truck 18",
    assignee: "Maya Patel",
    status: "Assigned",
    returnDue: "Mar 18",
  },
  {
    vehicle: "Van 07",
    assignee: "Luis Ortega",
    status: "Inspection due",
    returnDue: "Mar 19",
  },
  {
    vehicle: "SUV 03",
    assignee: "Tariq Aziz",
    status: "Assigned",
    returnDue: "Mar 22",
  },
];

export default function FleetDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Fleet dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Fleet overview
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Review vehicle utilization, assignments, and inspection timelines.
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

        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Assignment spotlight
            </h2>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              2 actions needed
            </span>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Vehicle</th>
                  <th className="px-4 py-3">Assignee</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Return due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {assignments.map((row) => (
                  <tr key={row.vehicle} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {row.vehicle}
                    </td>
                    <td className="px-4 py-3">{row.assignee}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{row.returnDue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
