"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LeadForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("Unable to confirm your session. Please refresh and try again.");
      setIsSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase.from("leads").insert({
      owner_id: user.id,
      name,
      company: company || null,
      email: email || null,
      phone: phone || null,
    });

    if (insertError) {
      setError(insertError.message);
      setIsSubmitting(false);
      return;
    }

    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setIsSubmitting(false);
    router.refresh();
  };

  return (
    <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Add a lead</h2>
          <p className="mt-1 text-sm text-slate-600">
            Capture a new lead to keep the list up to date.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Name
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            name="name"
            onChange={(event) => setName(event.target.value)}
            required
            value={name}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Company
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            name="company"
            onChange={(event) => setCompany(event.target.value)}
            value={company}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Email
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            value={email}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Phone
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            name="phone"
            onChange={(event) => setPhone(event.target.value)}
            value={phone}
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

      <div className="mt-6 flex justify-end">
        <button
          className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Saving..." : "Add lead"}
        </button>
      </div>
    </form>
  );
}
