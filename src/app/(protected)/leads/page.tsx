import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LeadForm from "./LeadForm";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

type LeadRow = {
  id: string;
  name: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
};

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: leadsData } = await supabase
    .from("leads")
    .select("id, name, company, email, phone, created_at")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  const leads = (leadsData ?? []) as LeadRow[];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Leads</h1>
            <p className="mt-1 text-sm text-slate-600">
              View the leads assigned to your account.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <LeadForm />
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {leads.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-slate-500" colSpan={5}>
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-medium text-slate-900">
                      {lead.name ?? "—"}
                    </td>
                    <td className="px-4 py-4">{lead.company ?? "—"}</td>
                    <td className="px-4 py-4">{lead.email ?? "—"}</td>
                    <td className="px-4 py-4">{lead.phone ?? "—"}</td>
                    <td className="px-4 py-4">
                      {lead.created_at
                        ? dateFormatter.format(new Date(lead.created_at))
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
