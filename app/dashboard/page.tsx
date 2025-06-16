import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await verifySession();
  const userRole = session?.user?.role; // Assuming 'role' is part of the session object

  if (userRole === "admin") {
    // return
    return <div>Admin Dashboard</div>;
  } else if (userRole === "user") {
    // return <UserDashboard />
    return <div>User Dashboard</div>;
  } else {
    redirect("/login");
  }
}
