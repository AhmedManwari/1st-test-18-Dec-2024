"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type LoginState = {
  error?: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: error?.message ?? "Unable to sign in." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", data.user.id)
    .maybeSingle();

  if (profileError) {
    return { error: profileError.message };
  }

  if (!profile) {
    const timestamp = new Date().toISOString();
    const { error: insertError } = await supabase.from("profiles").insert({
      id: data.user.id,
      email: data.user.email ?? email,
      created_at: timestamp,
      updated_at: timestamp,
    });

    if (insertError) {
      return { error: insertError.message };
    }
  }

  redirect("/");
}
