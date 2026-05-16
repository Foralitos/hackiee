import { CheckCircle2 } from "lucide-react";

export default function ComplianceItem({ title, note }) {
  return (
    <div className="flex items-start gap-4 py-6 border-b border-stone-200/70 dark:border-stone-800/70">
      <CheckCircle2
        size={20}
        strokeWidth={2}
        className="text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0"
      />
      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-foreground tracking-tight">
          {title}
        </h3>
        {note && (
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}
