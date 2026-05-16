import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import config from "@/config";
import DashboardShell from "@/components/templates/DashboardShell";

export default async function PrivateLayout({ children }) {
  const session = await auth();
  if (!session) redirect(config.auth.loginUrl);

  return <DashboardShell user={session.user}>{children}</DashboardShell>;
}
