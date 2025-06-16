import { logout } from "@/actions/auth";
import React from "react";

function DashboardPage() {
  return <div>DashboardPage

    <button onClick={logout}>Logout</button>
  </div>;
}

export default DashboardPage;
