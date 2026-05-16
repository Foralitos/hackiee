import Link from "next/link";
import Header from "@/components/organisms/Header";
import PageShell from "@/components/templates/PageShell";
import Button from "@/components/atoms/Button";
import config from "@/config";

export default function Home() {
  return (
    <>
      <Header />
      <PageShell className="flex items-center justify-center">
        <div className="flex flex-col items-center text-center gap-6 max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            {config.appName}
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {config.appDescription}
          </p>
          <div className="flex gap-3">
            <Button as={Link} href={config.auth.callbackUrl}>
              Go to dashboard
            </Button>
            <Button as="a" variant="ghost" href="https://authjs.dev" target="_blank" rel="noopener noreferrer">
              Auth.js docs
            </Button>
          </div>
        </div>
      </PageShell>
    </>
  );
}
