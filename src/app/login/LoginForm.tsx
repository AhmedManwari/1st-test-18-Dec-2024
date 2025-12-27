"use client";

import { useFormState } from "react-dom";
import { login } from "./actions";

const initialState = { error: undefined } as { error?: string };

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <label className="block text-sm font-medium text-slate-700">
        Email
        <input
          type="email"
          name="email"
          required
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="you@example.com"
          autoComplete="email"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Password
        <input
          type="password"
          name="password"
          required
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </label>
      {state?.error ? (
        <p className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        className="w-full rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Sign in
      </button>
    </form>
  );
}
