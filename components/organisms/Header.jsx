import Link from "next/link";
import { auth } from "@/lib/auth";
import config from "@/config";
import Button from "@/components/atoms/Button";
import UserMenu from "@/components/molecules/UserMenu";

export default async function Header() {
  const session = await auth();

  return (
    <header className="w-full border-b border-black/[.06] dark:border-white/[.08]">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight">
          {config.appName}
        </Link>
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button as={Link} href={config.auth.loginUrl}>
            Sign in
          </Button>
        )}
      </div>
    </header>
  );
}
