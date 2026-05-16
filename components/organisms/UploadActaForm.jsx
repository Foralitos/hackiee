"use client";

import { useState } from "react";
import { Upload, AlertCircle } from "lucide-react";
import Button from "@/components/atoms/Button";
import CasillaAutocomplete from "@/components/molecules/CasillaAutocomplete";
import ActaResultView from "@/components/organisms/ActaResultView";
import ActaResultSkeleton from "@/components/organisms/ActaResultSkeleton";

export default function UploadActaForm() {
  const [file, setFile] = useState(null);
  const [casillaId, setCasillaId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const form = new FormData();
      form.append("image", file);
      if (casillaId) form.append("casillaId", casillaId);

      const res = await fetch("/api/actas", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
      setResult(data.acta);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 p-6 border border-stone-300 dark:border-stone-700"
      >
        <label className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500">
            Imagen del acta
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm file:mr-3 file:border-0 file:bg-foreground file:text-background file:px-4 file:py-2 file:text-sm file:font-medium file:cursor-pointer file:tracking-wide hover:file:opacity-90"
            required
          />
          {file && (
            <span className="text-xs text-stone-500 font-mono">
              {file.name} · {(file.size / 1024).toFixed(0)} KB
            </span>
          )}
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500">
            Casilla <span className="normal-case tracking-normal text-stone-400">(opcional, habilita cross-check)</span>
          </span>
          <CasillaAutocomplete value={casillaId} onChange={setCasillaId} />
        </div>

        <div>
          <Button type="submit" disabled={!file || loading}>
            <Upload size={16} strokeWidth={2.25} />
            {loading ? "Procesando acta…" : "Procesar acta"}
          </Button>
        </div>
      </form>

      {error && (
        <div className="flex items-start gap-3 p-4 border-l-2 border-red-700 dark:border-red-400 bg-red-50/60 dark:bg-red-950/20 text-sm">
          <AlertCircle
            size={18}
            strokeWidth={2.25}
            className="text-red-700 dark:text-red-400 mt-0.5 shrink-0"
          />
          <div>
            <div className="font-semibold text-red-700 dark:text-red-400">
              No se pudo procesar el acta
            </div>
            <div className="text-stone-700 dark:text-stone-300 mt-1 font-mono text-xs">
              {error}
            </div>
          </div>
        </div>
      )}

      {loading && <ActaResultSkeleton />}
      {!loading && result && (
        <ActaResultView acta={result} onActaUpdated={setResult} />
      )}
    </div>
  );
}
