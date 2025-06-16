import "server-only";
import { getUser } from "@/lib/dal";
import { User } from "./definitions";
import { adminDb } from "@/firebase/admin";

function canSeeUsername(viewer: User) {
  return true;
}

function canSeePhoneNumber(viewer: User, team: string) {
  return viewer.isAdmin || team === viewer.team;
}

export async function getProfileDTO(slug: string) {
  const snapshot = await adminDb
    .collection("users")
    .where("slug", "==", slug)
    .get();
  const data = snapshot.docs.map((doc) => doc.data());
  //   })
  //   const user = data[0]

  const currentUser: {
    id: string;
    username: string;
    phonenumber: string;
    team: string;
    isAdmin: boolean;
  } | null = await getUser();

  // Or return only what's specific to the query here
  return {
    username: canSeeUsername(currentUser) ? user.username : null,
    phonenumber: canSeePhoneNumber(currentUser, user.team)
      ? user.phonenumber
      : null,
  };
}
