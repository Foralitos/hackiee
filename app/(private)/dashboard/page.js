import { auth } from "@/lib/auth";
import Header from "@/components/organisms/Header";
import PageShell from "@/components/templates/PageShell";
import Avatar from "@/components/atoms/Avatar";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  const user = session.user;

  return (
    <>
      <Header />
      <PageShell>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              You are signed in as {user.email}.
            </p>
          </div>

          <div className="rounded-2xl border border-black/[.06] dark:border-white/[.08] p-6 flex items-center gap-4">
            <Avatar src={user.image} name={user.name || user.email} size={56} />
            <div className="flex flex-col gap-1">
              <span className="text-base font-medium">{user.name || user.email}</span>
              <span className="text-xs uppercase tracking-wider text-zinc-500">
                role: {user.role || "user"}
              </span>
            </div>
          </div>
        </div>
      </PageShell>
    </>
  );
}
