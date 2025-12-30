const summaryCards = [
  { label: "Purchase requests", value: "24", helper: "6 awaiting approval" },
  { label: "Purchase orders", value: "18", helper: "4 pending receipt" },
  { label: "Goods receipts", value: "12", helper: "2 pending review" },
];

const approvals = [
  {
    item: "PR-2041",
    requester: "Jordan Lee",
    amount: "$4,200",
    status: "Submitted",
  },
  {
    item: "PR-2038",
    requester: "Amira Noor",
    amount: "$1,150",
    status: "Submitted",
  },
  {
    item: "PR-2035",
    requester: "Kofi Mensah",
    amount: "$8,750",
    status: "Draft pending review",
  },
];

export default function PurchasingDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Purchasing dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Purchasing overview
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Track purchase requests, approvals, and deliveries across teams.
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
              Approval queue
            </h2>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              3 items require action
            </span>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Request</th>
                  <th className="px-4 py-3">Requester</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {approvals.map((row) => (
                  <tr key={row.item} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {row.item}
                    </td>
                    <td className="px-4 py-3">{row.requester}</td>
                    <td className="px-4 py-3">{row.amount}</td>
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
        </section>
      </div>
    </main>
  );
}
