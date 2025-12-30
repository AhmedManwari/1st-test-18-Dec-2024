const summaryCards = [
  { label: "Materials tracked", value: "312", helper: "18 categories" },
  { label: "Low stock items", value: "9", helper: "Reorder suggestions ready" },
  { label: "Open movements", value: "14", helper: "5 issues, 9 receipts" },
];

const movements = [
  {
    reference: "MOV-4012",
    material: "Hydraulic oil",
    location: "Main warehouse",
    type: "Receive",
  },
  {
    reference: "MOV-4010",
    material: "Safety gloves",
    location: "Site store A",
    type: "Issue",
  },
  {
    reference: "MOV-4006",
    material: "Steel tubing",
    location: "Main warehouse",
    type: "Receive",
  },
];

export default function StoresDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Stores dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Inventory overview
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Monitor stock levels, location balances, and movement activity.
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
              Recent stock movements
            </h2>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Updated 10 min ago
            </span>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Movement</th>
                  <th className="px-4 py-3">Material</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {movements.map((row) => (
                  <tr key={row.reference} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {row.reference}
                    </td>
                    <td className="px-4 py-3">{row.material}</td>
                    <td className="px-4 py-3">{row.location}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {row.type}
                      </span>
                    </td>
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
