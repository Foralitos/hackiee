"use client";

import { useEffect, useState } from "react";
import ActaFilters from "@/components/molecules/ActaFilters";
import ActaList from "@/components/organisms/ActaList";

export default function ActaBrowser() {
  const [estado, setEstado] = useState(null);
  const [cola, setCola] = useState(null);
  const [actas, setActas] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const qs = new URLSearchParams();
        if (estado) qs.set("estado", estado);
        if (cola) qs.set("cola", cola);

        const res = await fetch(`/api/actas?${qs.toString()}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
        setActas(data.actas || []);
        setTotal(typeof data.total === "number" ? data.total : null);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
        setActas([]);
        setTotal(null);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [estado, cola]);

  return (
    <div className="flex flex-col gap-6">
      <ActaFilters
        estado={estado}
        cola={cola}
        onEstadoChange={setEstado}
        onColaChange={setCola}
      />
      <ActaList
        actas={actas}
        loading={loading}
        error={error}
        total={total}
      />
    </div>
  );
}
