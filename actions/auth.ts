"use server";

import { adminDb } from "@/firebase/admin";
import { createSession, deleteSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  if (!email || !name || !password) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await adminDb.collection("users").add({
    email,
    name,
    password: hashedPassword,
  });

  console.log(result.id);

  await createSession(result.id);

  redirect("/profile");
}

export async function logout() {
  await deleteSession();
  redirect("/dashboard");
}
