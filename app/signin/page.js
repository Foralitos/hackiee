import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SignInPanel from "@/components/organisms/SignInPanel";

export const metadata = {
  title: "Acceso · PREP Copilot",
};

export const dynamic = "force-dynamic";

function PanelFallback() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      <div className="h-3 w-48 bg-stone-200/60 dark:bg-stone-800/60" />
      <div className="flex flex-col gap-2">
        <div className="h-9 w-40 bg-stone-200/60 dark:bg-stone-800/60" />
        <div className="h-4 w-32 bg-stone-200/60 dark:bg-stone-800/60" />
      </div>
      <div className="h-4 w-full bg-stone-200/60 dark:bg-stone-800/60" />
      <div className="h-12 w-full bg-stone-200/60 dark:bg-stone-800/60" />
    </div>
  );
}

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-md flex flex-col gap-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] font-medium text-stone-500 dark:text-stone-500 hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft size={14} strokeWidth={2.25} />
          Volver al inicio
        </Link>

        <Suspense fallback={<PanelFallback />}>
          <SignInPanel />
        </Suspense>
      </div>
    </main>
  );
}
