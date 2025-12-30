const summaryCards = [
  { label: "Fleet available", value: "22", helper: "4 in maintenance" },
  { label: "Active assignments", value: "11", helper: "2 due this week" },
  { label: "Booking requests", value: "7", helper: "3 awaiting approval" },
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

const bookingRequests = [
  {
    reference: "BR-1024",
    requester: "Amina Yusuf",
    timeframe: "Mar 18 09:00 - 17:00",
    status: "Supervisor approval",
  },
  {
    reference: "BR-1021",
    requester: "Isaac Kim",
    timeframe: "Mar 19 08:00 - 12:00",
    status: "Fleet assignment",
  },
  {
    reference: "BR-1019",
    requester: "Lina Ortega",
    timeframe: "Mar 20 13:00 - 18:00",
    status: "Availability check",
  },
];

const tripChecklist = [
  "Availability check runs automatically before assignment.",
  "Supervisor approval required before fleet officer assignment.",
  "Trip log captured with odometer readings and return confirmation.",
  "Before/after vehicle photos attached to the booking record.",
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
            Review vehicle utilization, booking requests, and inspection
            timelines.
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
              Vehicle booking workflow
            </h2>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Auto checks enabled
            </span>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {tripChecklist.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Booking requests
              </h2>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                3 awaiting action
              </span>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Request</th>
                    <th className="px-4 py-3">Requester</th>
                    <th className="px-4 py-3">Timeframe</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {bookingRequests.map((row) => (
                    <tr key={row.reference} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {row.reference}
                      </td>
                      <td className="px-4 py-3">{row.requester}</td>
                      <td className="px-4 py-3">{row.timeframe}</td>
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
          </div>
        </section>
      </div>
    </main>
  );
}
