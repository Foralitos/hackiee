import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";

const STATES = {
  ok: { Icon: CheckCircle2, text: "text-emerald-700 dark:text-emerald-400" },
  fail: { Icon: XCircle, text: "text-red-700 dark:text-red-400" },
  unknown: { Icon: HelpCircle, text: "text-stone-400 dark:text-stone-500" },
};

export default function ValidationItem({ state = "unknown", label, detail }) {
  const { Icon, text } = STATES[state] || STATES.unknown;
  const detailItalic = state === "unknown" ? "italic" : "";

  return (
    <div className="flex items-start gap-3 py-3.5">
      <Icon
        size={18}
        strokeWidth={2}
        className={`${text} mt-0.5 shrink-0`}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <span className="text-sm font-medium text-foreground leading-snug">
          {label}
        </span>
        {detail && (
          <span
            className={`text-xs font-mono tabular-nums text-stone-500 dark:text-stone-500 leading-relaxed ${detailItalic}`}
          >
            {detail}
          </span>
        )}
      </div>
    </div>
  );
}
