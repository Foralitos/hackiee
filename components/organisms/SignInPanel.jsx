"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import GoogleSignInButton from "@/components/molecules/GoogleSignInButton";

const ERROR_MESSAGES = {
  OAuthAccountNotLinked:
    "Esta cuenta ya está vinculada con otro método de inicio de sesión.",
  AccessDenied: "Tu cuenta no tiene acceso a este sistema.",
  Configuration:
    "Error de configuración del servidor. Contacta al administrador.",
  Verification: "El enlace de verificación expiró o ya fue usado.",
  default: "No se pudo iniciar sesión. Intenta de nuevo.",
};

export default function SignInPanel() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const errorCode = searchParams.get("error");
  const errorMessage = errorCode
    ? ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.default
    : null;

  return (
    <div
      className="flex flex-col gap-8"
      style={{ animation: "fade-in-up 500ms ease-out both" }}
    >
      <div className="inline-flex items-center gap-3 self-start">
        <span className="w-8 h-px bg-slate-700 dark:bg-slate-400" />
        <span className="text-[10px] uppercase tracking-[0.28em] font-medium text-slate-700 dark:text-slate-400 font-mono">
          Hackathon IEE 2026 · Eje 7
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          PREP Copilot
        </h1>
        <h2 className="text-base font-medium text-stone-600 dark:text-stone-400">
          Acceso al sistema
        </h2>
      </div>

      <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
        Inicia sesión con tu cuenta institucional para continuar al panel del
        operador.
      </p>

      <div className="flex flex-col gap-3">
        <GoogleSignInButton callbackUrl={callbackUrl} />

        {errorMessage && (
          <div
            className="flex items-start gap-3 p-3 border-l-2 border-red-700 dark:border-red-400 bg-red-50/60 dark:bg-red-950/20 text-sm"
            role="alert"
          >
            <AlertCircle
              size={16}
              strokeWidth={2.25}
              className="text-red-700 dark:text-red-400 mt-0.5 shrink-0"
            />
            <span className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {errorMessage}
            </span>
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-stone-200/70 dark:border-stone-800/70">
        <p className="text-xs text-stone-500 dark:text-stone-500 leading-relaxed">
          Acceso restringido al personal del IEE Chihuahua. Si tu cuenta no
          aparece en la lista de operadores autorizados, contacta a tu consejo
          distrital.
        </p>
      </div>
    </div>
  );
}
