import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";
import { adminDb } from "@/firebase/admin";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await adminDb
      .collection("users")
      .where("id", "==", session.userId)
      .get();
    if (data.empty) {
      console.log("No user found");
      return null;
    }

    // Assuming the user ID is unique, we can take the first document
    if (data.docs.length === 0) {
      console.log("No user found");
      return null;
    }
    // Extract the user data from the first document
    const user = {
      id: data.docs[0].id,
      name: data.docs[0].data().name,
      email: data.docs[0].data().email,
    };

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
