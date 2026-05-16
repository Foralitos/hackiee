import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import config from "@/config";

export default async function PrivateLayout({ children }) {
  const session = await auth();
  if (!session) redirect(config.auth.loginUrl);
  return children;
}
